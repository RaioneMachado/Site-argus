document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        document.querySelector('.cyber-loader').classList.add('loaded');
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
            const left = Math.random() * 100;
            const animationDuration = 5 + Math.random() * 10;
            const animationDelay = Math.random() * 5;
            const fontSize = 12 + Math.random() * 10;
            const opacity = 0.1 + Math.random() * 0.5;
            
            // Apply styles
            span.style.left = `${left}%`;
            span.style.animationDuration = `${animationDuration}s`;
            span.style.animationDelay = `${animationDelay}s`;
            span.style.fontSize = `${fontSize}px`;
            span.style.opacity = opacity;
            
            binaryRain.appendChild(span);
        }
    }
    
    createBinaryRain();

    // Header Scroll Effect
    const header = document.querySelector('.cyber-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const cyberNav = document.querySelector('.cyber-nav');
    
    if (menuToggle && cyberNav) {
        menuToggle.addEventListener('click', function() {
            cyberNav.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Animated Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        function animateStats() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const speed = 200; // ms
                const increment = target / speed;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    stat.textContent = Math.floor(current);
                }, 1);
            });
        }
        
        // Intersection Observer to trigger animation when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelector('.cyber-stats').querySelector('.container').querySelectorAll('.stat-item').forEach(item => {
            observer.observe(item);
        });
    }

    // Service Cards Animation
    const serviceCards = document.querySelectorAll('.service-preview-card, .differential-card');
    serviceCards.forEach(card => {
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
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> MENSAGEM ENVIADA';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    alert('Sua mensagem foi enviada com sucesso! Nossa equipe entrará em contato em breve.');
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
                
                // Close mobile menu if open
                if (cyberNav && cyberNav.classList.contains('active')) {
                    cyberNav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
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
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-preview-card, .differential-card, .service-hub-card, .differential-expanded, .process-step, .case-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    const animatedElements = document.querySelectorAll('.service-preview-card, .differential-card, .service-hub-card, .differential-expanded, .process-step, .case-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});
document.querySelectorAll('.cyber-faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentNode;
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        
        // Fecha todos os itens
        document.querySelectorAll('.cyber-faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.cyber-faq-question').setAttribute('aria-expanded', 'false');
        });
        
        // Abre o item clicado se não estiver aberto
        if (!isOpen) {
            item.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
        }
    });
});
// Animação de contagem dos números
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
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

// Disparar animação quando a seção for visualizada
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, {threshold: 0.5});

observer.observe(document.querySelector('.cyber-investment'));

