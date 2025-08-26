// JavaScript Principal do Site

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todas as funcionalidades
    initMobileMenu();
    initGallery();
    initLightbox();
    initFormHandling();
    initScrollAnimations();
    initSmoothScrolling();
    initToolShowcase();
});

// Menu Mobile
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Galeria Interativa
function initGallery() {
    const track = document.querySelector('.galeria-track');
    const prevBtn = document.querySelector('.galeria-nav.prev');
    const nextBtn = document.querySelector('.galeria-nav.next');
    let currentIndex = 0;

    if (track && prevBtn && nextBtn) {
        const items = track.querySelectorAll('.galeria-item');
        const itemWidth = 330; // 300px + 30px margin

        function updateGallery() {
            const translateX = -currentIndex * itemWidth;
            track.style.transform = `translateX(${translateX}px)`;

            // Atualizar estado dos botões
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex >= items.length - 3 ? '0.5' : '1';
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateGallery();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < items.length - 3) {
                currentIndex++;
                updateGallery();
            }
        });

        // Inicializar estado dos botões
        updateGallery();

        // Navegação com teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        });
    }
}

// Lightbox
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && lightboxClose) {
        // Fechar lightbox
        function closeLightbox() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Pausar vídeo se estiver reproduzindo
            const lightboxVideo = document.getElementById('lightbox-video');
            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.src = '';
            }
        }

        lightboxClose.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'block') {
                closeLightbox();
            }
        });
    }
}

// Função global para abrir lightbox
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');

    if (lightbox && lightboxImg && lightboxVideo) {
        // Verificar se é vídeo ou imagem
        if (element.tagName === 'VIDEO') {
            lightboxImg.style.display = 'none';
            lightboxVideo.style.display = 'block';
            lightboxVideo.src = element.src;
            lightboxVideo.play();
        } else {
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
            lightboxImg.src = element.src;
            lightboxImg.alt = element.alt;
        }
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Formulário
function initFormHandling() {
    const form = document.querySelector('.project-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Coletar dados do formulário
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validação básica
            if (!data.nome || !data.email || !data.telefone || !data.projeto) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Criar conteúdo do email
            const subject = 'Novo Projeto - Site Kelly Magalhães';
            const body = `
Nome: ${data.nome}
E-mail: ${data.email}
Telefone/WhatsApp: ${data.telefone}
Tipo de Projeto: ${data.projeto}

---
Mensagem enviada através do site: ${window.location.href}
            `.trim();

            // Criar link mailto com os dados
            const mailtoLink = `mailto:kellymagalhaesilustra@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Abrir cliente de email padrão
            window.open(mailtoLink);

            // Mostrar mensagem de sucesso
            alert('Obrigado! Seu projeto foi enviado com sucesso. Entraremos em contato em breve!');

            // Fechar modal e limpar formulário
            closeForm();
            form.reset();
        });
    }
}

// Modal do formulário
function openForm() {
    const modal = document.getElementById('formModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Focar no primeiro campo
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeForm() {
    const modal = document.getElementById('formModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Animações de Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observar elementos com animação de scroll
    const scrollElements = document.querySelectorAll('.scroll-animate');
    scrollElements.forEach(el => observer.observe(el));

    // Adicionar classe scroll-animate aos elementos que precisam
    const elementsToAnimate = document.querySelectorAll('.column, .projeto-card, .galeria-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Scroll Suave
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para o menu fixo

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Showcase de Ferramentas
function initToolShowcase() {
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const toolsLogos = document.querySelector('.tools-logos');

    if (arrowLeft && arrowRight && toolsLogos) {
        let currentTool = 0;
        const tools = toolsLogos.querySelectorAll('.tool-logo');

        function showTool(index) {
            tools.forEach((tool, i) => {
                tool.style.opacity = i === index ? '1' : '0.3';
                tool.style.transform = i === index ? 'scale(1.1)' : 'scale(1)';
            });
        }

        arrowLeft.addEventListener('click', () => {
            currentTool = currentTool > 0 ? currentTool - 1 : tools.length - 1;
            showTool(currentTool);
        });

        arrowRight.addEventListener('click', () => {
            currentTool = currentTool < tools.length - 1 ? currentTool + 1 : 0;
            showTool(currentTool);
        });

        // Inicializar
        showTool(0);
    }
}

// Efeitos de Parallax (opcional)
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Lazy Loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Preloader (opcional)
function initPreloader() {
    const preloader = document.querySelector('.preloader');

    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

// Validação de formulário em tempo real
function initFormValidation() {
    const inputs = document.querySelectorAll('.form-group input, .form-group select');

    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;

    // Remover classes de erro anteriores
    field.classList.remove('error', 'success');

    // Validações específicas
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'nome':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Nome deve ter pelo menos 2 caracteres';
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'E-mail inválido';
            }
            break;

        case 'telefone':
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                isValid = false;
                errorMessage = 'Telefone inválido';
            }
            break;

        case 'projeto':
            if (!value) {
                isValid = false;
                errorMessage = 'Selecione um tipo de projeto';
            }
            break;
    }

    // Aplicar classes e mensagens
    if (isValid) {
        field.classList.add('success');
        removeErrorMessage(field);
    } else {
        field.classList.add('error');
        showErrorMessage(field, errorMessage);
    }
}

function showErrorMessage(field, message) {
    removeErrorMessage(field);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';

    field.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Inicializar validação de formulário
initFormValidation();

// Adicionar funcionalidade de "Voltar ao topo"
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #FF4DC6;
        color: #FEFEFE;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar botão "Voltar ao topo"
initBackToTop();

// Console log para debug
console.log('Site Kelly Magalhães carregado com sucesso! 🎨');

// Inicializar vídeo automaticamente
function initVideo() {
    const video = document.querySelector('.video-placeholder video');
    if (video) {
        console.log('Vídeo encontrado, inicializando...');
        
        // Forçar reprodução
        video.addEventListener('loadedmetadata', function() {
            console.log('Metadados do vídeo carregados');
            video.play().then(() => {
                console.log('Vídeo iniciado com sucesso');
            }).catch(error => {
                console.log('Erro ao iniciar vídeo:', error);
                // Tentar novamente
                setTimeout(() => {
                    video.play().catch(e => console.log('Segunda tentativa falhou:', e));
                }, 1000);
            });
        });

        video.addEventListener('error', function(e) {
            console.log('Erro no vídeo:', e);
        });

        video.addEventListener('play', function() {
            console.log('Vídeo começou a reproduzir');
        });
    } else {
        console.log('Vídeo não encontrado');
    }
}

// Inicializar vídeo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initVideo();
});

// Também tentar inicializar quando a página estiver totalmente carregada
window.addEventListener('load', function() {
    initVideo();
}); 