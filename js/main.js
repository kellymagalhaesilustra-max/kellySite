// Verificação do PDF.js
if (typeof pdfjsLib === 'undefined') {
  console.error('PDF.js não foi carregado corretamente');
}

let currentPdf = null;
let currentPage = 1;
let totalPages = 0;
let currentPdfPath = 'pdfs/mulheres.pdf';

// -------------------- Funções do Flipbook -------------------- //
function loadFlipbook(pdfPath, buttonElement) {
  console.log('Carregando PDF:', pdfPath);
  
  // Verificar se PDF.js está disponível
  if (typeof pdfjsLib === 'undefined') {
    console.error('PDF.js não está disponível');
    return;
  }
  
  // Miniaturas
  document.querySelectorAll('.cover-thumbnail').forEach(el => el.classList.remove('active'));
  if (buttonElement) buttonElement.classList.add('active');

  currentPdfPath = pdfPath;
  currentPage = 1;
  totalPages = 0;

  const flipbook = document.querySelector('.simple-flipbook');
  if (!flipbook) {
    console.error('Container do flipbook não encontrado');
    return;
  }
  
  flipbook.innerHTML = '<div class="loading">Carregando PDF...</div>';

  // Carregar PDF com timeout
  const loadingTask = pdfjsLib.getDocument(pdfPath);
  
  // Adicionar timeout de 30 segundos
  const timeout = setTimeout(() => {
    console.error('Timeout ao carregar PDF');
    flipbook.innerHTML = '<div class="error">Timeout ao carregar PDF. Verifique sua conexão.</div>';
  }, 30000);

  loadingTask.promise.then(pdf => {
    clearTimeout(timeout);
    console.log('PDF carregado com sucesso:', pdf.numPages, 'páginas');
    currentPdf = pdf;
    totalPages = pdf.numPages;
    updatePageInfo();
    renderPage();
  }).catch(error => {
    clearTimeout(timeout);
    console.error('Erro ao carregar PDF:', error);
    let errorMessage = 'Erro ao carregar PDF';
    
    if (error.name === 'MissingPDFException') {
      errorMessage = 'Arquivo PDF não encontrado';
    } else if (error.name === 'InvalidPDFException') {
      errorMessage = 'Arquivo PDF inválido';
    } else if (error.name === 'UnexpectedResponseException') {
      errorMessage = 'Erro de rede ao carregar PDF';
    } else {
      errorMessage = 'Erro ao carregar PDF: ' + error.message;
    }
    
    flipbook.innerHTML = '<div class="error">' + errorMessage + '</div>';
  });
}

function renderPage() {
  const flipbook = document.querySelector('.simple-flipbook');
  flipbook.innerHTML = '';

  // Criar container para uma única página (como revista)
  const pageContainer = document.createElement('div');
  pageContainer.className = 'page-container';
  
  if (currentPage <= totalPages) {
    renderSinglePage(currentPage, pageContainer);
  } else {
    pageContainer.innerHTML = '<div class="empty-page">Página não disponível</div>';
  }
  flipbook.appendChild(pageContainer);
}

function renderSinglePage(pageNum, container) {
  currentPdf.getPage(pageNum).then(page => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    page.render(renderContext).promise.then(() => {
      container.appendChild(canvas);
      
      // Adicionar elementos de sombra e borda
      const shadowElement = document.createElement('div');
      shadowElement.className = 'page-shadow';
      container.appendChild(shadowElement);

      const borderElement = document.createElement('div');
      borderElement.className = 'page-border';
      container.appendChild(borderElement);
    });
  });
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePageInfo();
    renderPage();
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePageInfo();
    renderPage();
  }
}

function goToPage(pageNum) {
  if (pageNum >= 1 && pageNum <= totalPages) {
    currentPage = pageNum;
    updatePageInfo();
    renderPage();
  }
}

function goToLastPage() {
  goToPage(totalPages);
}

function updatePageInfo() {
  const currentPageElement = document.getElementById('current-page');
  const totalPagesElement = document.getElementById('total-pages');
  
  if (currentPageElement) currentPageElement.textContent = currentPage;
  if (totalPagesElement) totalPagesElement.textContent = totalPages;
  
  // Atualizar estado dos botões
  const btnFirst = document.getElementById('btn-first');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnLast = document.getElementById('btn-last');
  
  if (btnFirst) btnFirst.disabled = currentPage <= 1;
  if (btnPrev) btnPrev.disabled = currentPage <= 1;
  if (btnNext) btnNext.disabled = currentPage >= totalPages;
  if (btnLast) btnLast.disabled = currentPage >= totalPages;
}

function testPDF() {
  console.log('Testando carregamento de PDF...');
  console.log('PDF.js disponível:', typeof pdfjsLib !== 'undefined');
  console.log('PDF.js worker configurado:', pdfjsLib?.GlobalWorkerOptions?.workerSrc);
  
  // Testar carregamento de um PDF simples
  const testPath = 'pdfs/mulheres.pdf';
  console.log('Testando carregamento de:', testPath);
  
  const flipbook = document.querySelector('.simple-flipbook');
  if (flipbook) {
    flipbook.innerHTML = '<div class="loading">Testando carregamento...</div>';
  }
  
  // Verificar se o arquivo existe via fetch
  fetch(testPath)
    .then(response => {
      console.log('Resposta do fetch:', response.status, response.statusText);
      if (response.ok) {
        console.log('Arquivo encontrado, tentando carregar com PDF.js...');
        return loadFlipbook(testPath);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    })
    .catch(error => {
      console.error('Erro no teste:', error);
      if (flipbook) {
        flipbook.innerHTML = '<div class="error">Erro no teste: ' + error.message + '</div>';
      }
    });
}

// -------------------- Funções do Modal -------------------- //
function openForm() {
  const modal = document.getElementById('formModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeForm() {
  const modal = document.getElementById('formModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// -------------------- Funções da Galeria -------------------- //
let currentGalleryIndex = 0;
let galleryItems = [];
let loadedImages = 0;
let totalImages = 0;

function initGallery() {
  const track = document.querySelector('.galeria-track');
  const items = document.querySelectorAll('.galeria-item');
  const loadingIndicator = document.getElementById('galeria-loading');
  
  if (track && items.length > 0) {
    galleryItems = Array.from(items);
    totalImages = galleryItems.length;
    
    // Mostrar indicador de carregamento
    if (loadingIndicator) {
      loadingIndicator.style.display = 'block';
    }
    
    // Inicializar com os primeiros 3 itens visíveis
    currentGalleryIndex = 0;
    
    // Carregar imagens com lazy loading otimizado
    loadGalleryImages();
    
    // Adicionar event listeners para navegação
    const prevBtn = document.querySelector('.galeria-nav.prev');
    const nextBtn = document.querySelector('.galeria-nav.next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentGalleryIndex > 0) {
          currentGalleryIndex = Math.max(0, currentGalleryIndex - 3);
          updateGalleryDisplay();
        }
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentGalleryIndex < galleryItems.length - 3) {
          currentGalleryIndex = Math.min(galleryItems.length - 3, currentGalleryIndex + 3);
          updateGalleryDisplay();
        }
      });
    }
  }
}

function loadGalleryImages() {
  const images = document.querySelectorAll('.galeria-item img');
  
  images.forEach((img, index) => {
    // Carregar as primeiras 6 imagens imediatamente
    if (index < 6) {
      loadImage(img);
    } else {
      // Usar Intersection Observer para lazy loading das demais
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      observer.observe(img);
    }
  });
}

function loadImage(img) {
  if (img.complete && img.naturalHeight !== 0) {
    // Imagem já carregada
    img.classList.add('loaded');
    loadedImages++;
    updateLoadingProgress();
    return;
  }
  
  img.addEventListener('load', () => {
    img.classList.add('loaded');
    loadedImages++;
    updateLoadingProgress();
  });
  
  img.addEventListener('error', () => {
    // Imagem falhou ao carregar - o fallback já está configurado no HTML
    loadedImages++;
    updateLoadingProgress();
  });
  
  // Forçar carregamento se ainda não foi iniciado
  if (!img.src) {
    img.src = img.dataset.src || img.src;
  }
}

function updateLoadingProgress() {
  const loadingIndicator = document.getElementById('galeria-loading');
  
  if (loadedImages >= totalImages && loadingIndicator) {
    // Todas as imagens foram carregadas
    setTimeout(() => {
      loadingIndicator.style.display = 'none';
      updateGalleryDisplay();
    }, 500);
  }
}

function updateGalleryDisplay() {
  const track = document.querySelector('.galeria-track');
  if (!track) return;
  
  // Calcular a posição de deslocamento
  const itemWidth = 320; // 300px + 20px gap
  const offset = currentGalleryIndex * itemWidth;
  
  // Aplicar transformação suave
  track.style.transform = `translateX(-${offset}px)`;
  
  // Atualizar estado dos botões de navegação
  const prevBtn = document.querySelector('.galeria-nav.prev');
  const nextBtn = document.querySelector('.galeria-nav.next');
  
  if (prevBtn) {
    prevBtn.disabled = currentGalleryIndex === 0;
    prevBtn.style.opacity = currentGalleryIndex === 0 ? '0.5' : '1';
  }
  
  if (nextBtn) {
    nextBtn.disabled = currentGalleryIndex >= galleryItems.length - 3;
    nextBtn.style.opacity = currentGalleryIndex >= galleryItems.length - 3 ? '0.5' : '1';
  }
}

// -------------------- Funções do Lightbox -------------------- //
function openLightbox(imgElement) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (lightbox && lightboxImg) {
    lightboxImg.src = imgElement.src;
    lightboxImg.alt = imgElement.alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// -------------------- Event Listeners -------------------- //
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar galeria de ilustrações
  initGallery();

  // Inicializar flipbook se estiver na página do flipbook
  const flipbookContainer = document.querySelector('.simple-flipbook');
  console.log('Container do flipbook encontrado:', !!flipbookContainer);
  
  if (flipbookContainer) {
    console.log('Flipbook detectado, aguardando seleção de PDF...');
    
    // Não carregar automaticamente, aguardar clique do usuário
    flipbookContainer.innerHTML = '<div class="loading">Selecione uma revista para começar</div>';
    
    // Controles de teclado para o flipbook
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') previousPage();
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'Home') goToPage(1);
      if (e.key === 'End') goToLastPage();
    });
  }

  // Fechar modal ao clicar fora dele
  const modal = document.getElementById('formModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeForm();
      }
    });
  }

  // Fechar lightbox ao clicar fora da imagem
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Fechar lightbox com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeForm();
      closeLightbox();
    }
  });

  // Fechar lightbox com o botão X
  const lightboxClose = document.querySelector('.lightbox-close');
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
}); 