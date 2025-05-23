document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        const loader = document.querySelector('.cyber-loader');
        if (loader) loader.classList.add('loaded');
    }, 1500);

    // Binary Rain Effect
    function createBinaryRain() {
        const binaryRain = document.querySelector('.binary-rain');
        if (!binaryRain) return;
        
        const characters = '01';
        const count = 50;
        
        for (let i = 0; i < count; i++) {
            const span = document.createElement('span');
            span.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
            
            // Random properties
            span.style.left = `${Math.random() * 100}%`;
            span.style.animationDuration = `${5 + Math.random() * 10}s`;
            span.style.animationDelay = `${Math.random() * 5}s`;
            span.style.fontSize = `${12 + Math.random() * 10}px`;
            span.style.opacity = 0.1 + Math.random() * 0.5;
            
            binaryRain.appendChild(span);
        }
    }
    
    createBinaryRain();

    // Header Scroll Effect
    const header = document.querySelector('.cyber-header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Mobile Menu Toggle - Versão definitiva corrigida
    const menuToggle = document.querySelector('.menu-toggle');
    const cyberNav = document.querySelector('.cyber-nav');
    
    if (menuToggle && cyberNav) {
        menuToggle.addEventListener('click', function() {
            // Alternar estado do menu
            cyberNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Alternar ícones
            const barsIcon = menuToggle.querySelector('.fa-bars');
            const timesIcon = menuToggle.querySelector('.fa-times');
            
            if (cyberNav.classList.contains('active')) {
                barsIcon.style.display = 'none';
                timesIcon.style.display = 'block';
            } else {
                barsIcon.style.display = 'block';
                timesIcon.style.display = 'none';
            }
        });

        // Fechar menu ao clicar em links
        document.querySelectorAll('.cyber-nav a').forEach(link => {
            link.addEventListener('click', function() {
                cyberNav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.querySelector('.fa-bars').style.display = 'block';
                menuToggle.querySelector('.fa-times').style.display = 'none';
            });
        });
    }

    // Animated Stats Counter
    function animateStats() {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }

    // Observer para animação de stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});

    const statsSection = document.querySelector('.cyber-stats') || document.querySelector('.cyber-investment');
    if (statsSection) statsObserver.observe(statsSection);

    // Service Cards Animation
    document.querySelectorAll('.service-preview-card, .differential-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.color = 'var(--secondary-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.color = '';
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            if (!submitBtn) return;
            
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> MENSAGEM ENVIADA';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    alert('Sua mensagem foi enviada com sucesso!');
                }, 2000);
            }, 1500);
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                if (cyberNav && cyberNav.classList.contains('active')) {
                    cyberNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.querySelector('.fa-bars').style.display = 'block';
                    menuToggle.querySelector('.fa-times').style.display = 'none';
                }
            }
        });
    });

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
            testimonialSlider.style.cursor = 'grabbing';
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialSlider.style.cursor = 'grab';
        });
        
        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialSlider.style.cursor = 'grab';
        });
        
        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // FAQ Accordion
    document.querySelectorAll('.cyber-faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentNode;
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            
            // Fechar todos os itens
            document.querySelectorAll('.cyber-faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.cyber-faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Abrir o item clicado se não estiver aberto
            if (!isOpen) {
                item.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Animate elements on scroll
    const animateElements = () => {
        const elements = document.querySelectorAll('.service-preview-card, .differential-card, .service-hub-card, .process-step, .case-card');
        const screenPosition = window.innerHeight / 1.2;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar animação
    const animatedElements = document.querySelectorAll('.service-preview-card, .differential-card, .service-hub-card, .process-step, .case-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateElements);
    animateElements(); // Executar uma vez ao carregar
});