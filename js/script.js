// ============================================
// INICIALIZACIÓN GENERAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeWhatsAppLinks();
    initializeAnimations();
    initializeCounters();
    initializeGallery();
});

// ============================================
// CONTADOR DE ESTADÍSTICAS CON ANIMACIÓN
// ============================================

function initializeCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(element => {
                    const target = parseInt(element.getAttribute('data-target'));
                    animateCounter(element, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ============================================
// NAVEGACIÓN ACTIVA
// ============================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Marcar enlace activo al hacer scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Cerrar navbar al hacer click en un enlace (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// ============================================
// EFECTOS DE SCROLL
// ============================================

function initializeScrollEffects() {
    // Agregar efecto de scroll suave a los botones
    const buttons = document.querySelectorAll('a[href^="#"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Evitar que ejecute si es un enlace de WhatsApp
            if (href.includes('whatsapp') || href.includes('wa.me')) {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// ACTUALIZAR ENLACES DE WHATSAPP
// ============================================

function initializeWhatsAppLinks() {
    // Reemplazar el número de WhatsApp (cambiar 593 por el número real)
    // Ejemplo: https://wa.me/593987654321
    
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Mensaje por defecto
            const message = "Hola, quisiera información sobre los servicios de Laboratorio Diesel MG";
            
            // Obtener el href original
            let href = this.getAttribute('href');
            
            // Si el href no tiene mensaje, agregarlo
            if (!href.includes('?')) {
                href += '?text=' + encodeURIComponent(message);
                this.setAttribute('href', href);
            }
        });
    });
}

// ============================================
// ANIMACIONES AL SCROLL
// ============================================

function initializeAnimations() {
    // Observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar animación a elementos específicos
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .feature-item, .equipment-item, .tip-card, .gallery-item, .testimonial-card'
    );
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ============================================
// INICIALIZAR GALERÍA
// ============================================

function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// ============================================
// ESTILOS DINÁMICOS PARA ANIMACIÓN
// ============================================

// Agregar estilos para la animación fade-in
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .nav-links a.active {
        color: #c41e3a;
        border-bottom-color: #c41e3a;
    }
    
    /* Efecto de hover en cards */
    .service-card,
    .feature-item,
    .equipment-item,
    .tip-card,
    .gallery-item,
    .testimonial-card {
        position: relative;
    }
    
    /* Animación de entrada para testimonios */
    .testimonial-card {
        animation: slideInLeft 0.6s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

document.head.appendChild(style);

// ============================================
// VALIDACIÓN DE FORMULARIOS (si los hay)
// ============================================

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#c41e3a';
            isValid = false;
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    return isValid;
}

// ============================================
// FUNCIONES ÚTILES ADICIONALES
// ============================================

// Detectar si el dispositivo es móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#25d366' : '#c41e3a'};
        color: white;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Agregar animaciones de notificación
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;

document.head.appendChild(notificationStyles);

// ============================================
// CONTADOR DE VISITANTES (OPCIONAL)
// ============================================

function initializeVisitorCounter() {
    // Obtener visitantes del localStorage
    let visitors = localStorage.getItem('visitors') || 0;
    visitors = parseInt(visitors) + 1;
    localStorage.setItem('visitors', visitors);
    
    console.log('Visitantes totales: ' + visitors);
}

// Inicializar contador
initializeVisitorCounter();

// ============================================
// MONITOREO DE RENDIMIENTO
// ============================================

window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Tiempo de carga de la página: ' + pageLoadTime + 'ms');
});

// ============================================
// MANEJO DE ERRORES
// ============================================

window.addEventListener('error', function(event) {
    console.error('Error detectado:', event.error);
});

// ============================================
// EFECTO PARALLAX OPCIONAL
// ============================================

function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            const elementPosition = element.offsetTop;
            const distance = scrollPosition - elementPosition;
            
            element.style.backgroundPosition = `center ${distance * 0.5}px`;
        });
    });
}

// ============================================
// SERVICIO WORKER PARA FUNCIONALIDAD OFFLINE (OPCIONAL)
// ============================================

if ('serviceWorker' in navigator) {
    // Descomentar si deseas implementar Service Worker
    // navigator.serviceWorker.register('service-worker.js')
    //     .then(registration => console.log('Service Worker registrado'))
    //     .catch(error => console.log('Error en Service Worker:', error));
}

// ============================================
// SMOOTH SCROLL PARA NAVEGADORES ANTIGUOS
// ============================================

function smoothScroll(element) {
    const startPosition = window.pageYOffset;
    const distance = element.offsetTop - startPosition;
    const duration = 1000;
    let start = null;

    const easeInOutQuad = (time, start, distance, duration) => {
        time /= duration / 2;
        if (time < 1) return distance / 2 * time * time + start;
        time--;
        return -distance / 2 * (time * (time - 2) - 1) + start;
    };

    const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const position = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, position);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    };

    requestAnimationFrame(animation);
}


// ============================================
// FUNCIONALIDAD FAQ - ACCORDION
// ============================================

function toggleFaq(element) {
    const faqQuestion = element;
    const faqItem = faqQuestion.parentElement;
    
    // Cerrar otros items abiertos
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.querySelector('.faq-question').classList.remove('active');
        }
    });
    
    // Toggle el item actual
    faqQuestion.classList.toggle('active');
}

// ============================================
// FUNCIONALIDAD FORMULARIO DE CONTACTO
// ============================================

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (!validateForm(this)) {
                showNotification('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            // Obtener datos del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Construir mensaje para WhatsApp
            const whatsappMessage = 'Hola, me gustaría solicitar información:' + String.fromCharCode(10) + String.fromCharCode(10) + 
                'Nombre: ' + nombre + String.fromCharCode(10) +
                'Email: ' + email + String.fromCharCode(10) +
                'Teléfono: ' + telefono + String.fromCharCode(10) +
                'Servicio: ' + servicio + String.fromCharCode(10) +
                'Mensaje: ' + mensaje;
            
            // Enviar por WhatsApp
            const whatsappUrl = 'https://wa.me/593?text=' + encodeURIComponent(whatsappMessage);
            window.open(whatsappUrl, '_blank');
            
            // Mostrar confirmación
            showNotification('Tu mensaje ha sido enviado. Nos pondremos en contacto pronto.', 'success');
            
            // Limpiar formulario
            this.reset();
        });
    }
}

// ============================================
// FUNCIÓN PARA ENVIAR POR WHATSAPP
// ============================================

function sendWhatsapp(service) {
    const message = 'Hola, me interesa el servicio: ' + service + '. ¿Cuál es el precio y disponibilidad?';
    const whatsappUrl = 'https://wa.me/593?text=' + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank');
}

// Inicializar formulario
document.addEventListener('DOMContentLoaded', () => {
    initializeContactForm();
});