// Configuração PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let currentPdf = null;
let currentPage = 1;
let totalPages = 0;
let currentPdfPath = 'pdfs/mulheres.pdf';

// -------------------- Funções -------------------- //
function loadFlipbook(pdfPath, buttonElement) {
  // Miniaturas
  document.querySelectorAll('.cover-thumbnail').forEach(el => el.classList.remove('active'));
  if (buttonElement) buttonElement.classList.add('active');

  currentPdfPath = pdfPath;
  currentPage = 1;
  totalPages = 0;

  const flipbook = document.querySelector('.simple-flipbook');
  flipbook.innerHTML = '<div class="loading">Carregando PDF...</div>';

  // Carregar PDF
  pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
    currentPdf = pdf;
    totalPages = pdf.numPages;
    updatePageInfo();
    renderPage();
  }).catch(error => {
    console.error('Erro ao carregar PDF:', error);
    flipbook.innerHTML = '<div class="error">Erro ao carregar PDF</div>';
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
  document.getElementById('current-page').textContent = currentPage;
  document.getElementById('total-pages').textContent = totalPages;
  
  // Atualizar estado dos botões
  document.getElementById('btn-first').disabled = currentPage <= 1;
  document.getElementById('btn-prev').disabled = currentPage <= 1;
  document.getElementById('btn-next').disabled = currentPage >= totalPages;
  document.getElementById('btn-last').disabled = currentPage >= totalPages;
}

// -------------------- Funções do Modal -------------------- //
function openForm() {
  const modal = document.getElementById('formModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Previne scroll da página
  }
}

function closeForm() {
  const modal = document.getElementById('formModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura scroll da página
  }
}

// Função para enviar o formulário
function handleFormSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    tipoProjeto: formData.get('tipo-projeto'),
    descricao: formData.get('descricao'),
    prazo: formData.get('prazo'),
    referencias: formData.get('referencias')
  };

  // Criar link mailto com os dados do formulário
  const subject = `Novo Projeto Editorial - ${data.tipoProjeto}`;
  const body = `
Nome: ${data.nome}
E-mail: ${data.email}
Tipo de Projeto: ${data.tipoProjeto}
Descrição: ${data.descricao}
Prazo: ${data.prazo}
Referências: ${data.referencias}
  `;

  const mailtoLink = `mailto:kellymagalhaesilustra@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Abrir cliente de e-mail padrão
  window.location.href = mailtoLink;
  
  // Fechar modal após envio
  setTimeout(() => {
    closeForm();
    event.target.reset(); // Limpar formulário
  }, 1000);
}

// -------------------- Event Listeners -------------------- //
document.addEventListener('DOMContentLoaded', () => {
  // Carregar primeiro PDF
  loadFlipbook(currentPdfPath);

  // Controles de teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') previousPage();
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'Home') goToPage(1);
    if (e.key === 'End') goToLastPage();
  });

  // Adicionar listener para o formulário
  const form = document.getElementById('projectForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
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

  // Fechar modal com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeForm();
    }
  });
}); 