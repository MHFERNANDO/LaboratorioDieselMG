/* ============================================
   LABORATORIO DIESEL MG - SCRIPT PRINCIPAL
   ============================================ */

// Inicialización de AOS (Animate on Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 900,
        easing: 'ease-in-out-cubic',
        offset: 100,
        once: false,
        mirror: true,
        disable: false
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    initializeNavigation();
    initializeMobileMenu();
    initializeWhatsAppSpeedDial();
    initializeFaqAccordion();
    initializeContactForm();
    initializeScrollSpyNavigation();
    initializeSmoothScroll();
    initializeIntersectionObserver();
});

// Refreshear AOS cuando la página está completamente cargada
window.addEventListener('load', function() {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

/* ============================================
   NAVEGACIÓN ACTIVA AL SCROLLEAR
   ============================================ */

function initializeScrollSpyNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', throttle(function() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }, 100));
}

/* ============================================
   MENÚ MÓVIL
   ============================================ */

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('open');
            mobileNav.classList.toggle('open');
            mobileNav.setAttribute('aria-hidden', mobileNav.classList.contains('open') ? 'false' : 'true');
            mobileMenuBtn.setAttribute('aria-expanded', mobileMenuBtn.classList.contains('open'));
        });

        // Cerrar menú al hacer click en un link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('open');
                mobileNav.classList.remove('open');
                mobileNav.setAttribute('aria-hidden', 'true');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Cerrar al hacer scroll
        window.addEventListener('scroll', function() {
            if (mobileMenuBtn.classList.contains('open')) {
                mobileMenuBtn.classList.remove('open');
                mobileNav.classList.remove('open');
                mobileNav.setAttribute('aria-hidden', 'true');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Cerrar al hacer click fuera del menú
        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenuBtn.classList.remove('open');
                mobileNav.classList.remove('open');
                mobileNav.setAttribute('aria-hidden', 'true');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/* ============================================
   SPEED-DIAL WHATSAPP
   ============================================ */

function initializeWhatsAppSpeedDial() {
    const waSpeedDial = document.getElementById('waSpeedDial');
    const waSpeedDialTrigger = document.getElementById('waSpeedDialTrigger');

    if (waSpeedDialTrigger && waSpeedDial) {
        waSpeedDialTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            waSpeedDial.classList.toggle('open');
            const isOpen = waSpeedDial.classList.contains('open');
            waSpeedDialTrigger.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar al hacer click en los botones de opciones
        const speedDialItems = waSpeedDial.querySelectorAll('.speed-dial-btn-small');
        speedDialItems.forEach(item => {
            item.addEventListener('click', function() {
                waSpeedDial.classList.remove('open');
                waSpeedDialTrigger.setAttribute('aria-expanded', 'false');
            });
        });

        // Cerrar al hacer click fuera
        document.addEventListener('click', function(event) {
            if (!waSpeedDial.contains(event.target)) {
                waSpeedDial.classList.remove('open');
                waSpeedDialTrigger.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/* ============================================
   ACORDEÓN FAQ
   ============================================ */

function toggleFaq(element) {
    const faqQuestion = element;
    const isActive = faqQuestion.classList.contains('active');

    // Cerrar todos los FAQ abiertos excepto el actual
    document.querySelectorAll('.faq-question').forEach(q => {
        if (q !== faqQuestion) {
            q.classList.remove('active');
        }
    });

    // Toggle el FAQ actual
    faqQuestion.classList.toggle('active');
}

function initializeFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFaq(this);
        });

        // Soporte para teclado (Enter/Space)
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaq(this);
            }
        });
    });
}

/* ============================================
   FORMULARIO DE CONTACTO
   ============================================ */

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const telefono = document.getElementById('telefono')?.value.trim() || '';
            const servicio = document.getElementById('servicio')?.value || '';
            const mensaje = document.getElementById('mensaje')?.value.trim() || '';
            const terminos = document.getElementById('terminos')?.checked || false;

            // Validación básica
            if (!nombre || !email || !telefono || !servicio || !terminos) {
                alert('Por favor, complete todos los campos requeridos y acepte los términos.');
                return;
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingrese un email válido.');
                return;
            }

            // Construir mensaje para WhatsApp
            const whatsappMessage = `
*SOLICITUD DE SERVICIO - LABORATORIO DIESEL MG*

*Nombre:* ${nombre}
*Email:* ${email}
*Teléfono:* ${telefono}
*Servicio:* ${servicio}
${mensaje ? `*Descripción:*\n${mensaje}` : ''}

_Enviado desde el formulario de contacto_
            `.trim();

            // Abrir WhatsApp con el mensaje
            const whatsappLink = `https://wa.me/593?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappLink, '_blank');

            // Mostrar confirmación
            alert('¡Gracias! Te hemos redirigido a WhatsApp. Por favor, envía el mensaje.');

            // Limpiar formulario
            contactForm.reset();
        });
    }
}

/* ============================================
   NAVEGACIÓN GENERAL CON SCROLL SUAVE
   ============================================ */

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Actualizar clase active
                    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
}

/* ============================================
   SCROLL SUAVE PARA TODOS LOS ENLACES INTERNOS
   ============================================ */

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================
   LAZY LOADING DE IMÁGENES
   ============================================ */

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.addEventListener('load', function() {
                        this.classList.add('loaded');
                    });
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sin IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Inicializar lazy loading si hay imágenes
if (document.querySelectorAll('img[data-src]').length > 0) {
    initializeLazyLoading();
}

/* ============================================
   CONTADORES ANIMADOS
   ============================================ */

function animateCounter(element, target, duration = 2000) {
    if (!element) return;

    let current = 0;
    const start = Date.now();
    const increment = target / (duration / 16);

    const updateCounter = () => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
        } else {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        }
    };

    updateCounter();
}

/* ============================================
   INTERSECTION OBSERVER PARA ANIMACIONES
   ============================================ */

function initializeIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const elements = document.querySelectorAll('[data-aos]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.visibility = 'visible';
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '50px'
        });

        elements.forEach(el => observer.observe(el));
    }
}

/* ============================================
   PARALLAX EFFECT (opcional)
   ============================================ */

function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length > 0 && 'IntersectionObserver' in window) {
        window.addEventListener('scroll', throttle(function() {
            parallaxElements.forEach(element => {
                const scrollPosition = window.pageYOffset;
                const elementOffset = element.offsetTop;
                const elementHeight = element.clientHeight;
                const distance = scrollPosition - elementOffset;

                if (distance > -window.innerHeight && distance < window.innerHeight) {
                    const parallaxSpeed = parseFloat(element.dataset.parallax) || 0.5;
                    element.style.transform = `translateY(${distance * parallaxSpeed}px)`;
                }
            });
        }, 10));
    }
}

initializeParallax();

/* ============================================
   THROTTLE FUNCTION PARA OPTIMIZAR EVENTOS
   ============================================ */

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   DEBOUNCE FUNCTION
   ============================================ */

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/* ============================================
   DETECTOR DE CONEXIÓN DE RED
   ============================================ */

window.addEventListener('online', function() {
    console.log('✓ Conexión a internet restaurada');
    document.body.classList.remove('offline');
});

window.addEventListener('offline', function() {
    console.log('✗ Sin conexión a internet');
    document.body.classList.add('offline');
});

// Verificar estado inicial
if (!navigator.onLine) {
    document.body.classList.add('offline');
}

/* ============================================
   UTILIDADES
   ============================================ */

// Actualizar año en el footer
function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('[data-year]');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

updateYear();

// Reproducir sonido (opcional)
function playSound(soundFile) {
    try {
        const audio = new Audio(soundFile);
        audio.volume = 0.3;
        audio.play().catch(err => {
            console.log('Audio no disponible:', err);
        });
    } catch (e) {
        console.log('Error al reproducir sonido:', e);
    }
}

// Función para copiar al portapapeles
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('✓ Copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    } else {
        // Fallback para navegadores antiguos
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

/* ============================================
   EXPORTAR FUNCIONES GLOBALES
   ============================================ */

window.toggleFaq = toggleFaq;
window.playSound = playSound;
window.copyToClipboard = copyToClipboard;
window.animateCounter = animateCounter;
window.throttle = throttle;
window.debounce = debounce;

/* ============================================
   MENSAJE DE CONSOLA
   ============================================ */

console.log('%c¡Laboratorio Diesel MG!', 'color: #c41e3a; font-size: 18px; font-weight: bold;');
console.log('%cEspecialistas en sistemas diesel con 10 años de trayectoria', 'color: #666; font-size: 12px;');