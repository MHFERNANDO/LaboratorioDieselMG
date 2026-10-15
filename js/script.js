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
   ACORDEÓN FAQ - LABORATORIO DIESEL MG
   ============================================ */

function toggleFaq(element) {
    const isActive = element.classList.contains('active');

    // Cerrar todos los demás para un efecto de acordeón real
    document.querySelectorAll('.faq-question').forEach(q => {
        if (q !== element) {
            q.classList.remove('active');
            q.setAttribute('aria-expanded', 'false');
        }
    });

    // Alternar el estado del actual
    element.classList.toggle('active');
    element.setAttribute('aria-expanded', !isActive);
}

function initializeFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        // Evento de Click
        question.addEventListener('click', function() {
            toggleFaq(this);
        });

        // Soporte para teclado
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
   Mecanismo original: se arma el mensaje y se abre WhatsApp (wa.me).
   No hay endpoint ni claves en el cliente.
   ============================================ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Teléfono Ecuador: 09XXXXXXXX o +5939XXXXXXXX
const PHONE_RE = /^(09\d{8}|\+5939\d{8})$/;
const SUBMIT_COOLDOWN_MS = 6000;

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const status = document.getElementById('formStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    const phone = form.elements.telefono;
    const email = form.elements.email;

    function setStatus(message, type) {
        if (!status) return;
        status.textContent = message;
        status.className = 'form-status' + (type ? ' is-' + type : '');
    }

    function validatePhone() {
        const value = phone.value.trim();
        const ok = value === '' || PHONE_RE.test(value);
        phone.setCustomValidity(ok ? '' : 'Ingrese un teléfono válido: 09XXXXXXXX o +5939XXXXXXXX.');
        return ok;
    }

    function validateEmail() {
        const value = email.value.trim();
        const ok = value === '' || EMAIL_RE.test(value);
        email.setCustomValidity(ok ? '' : 'Ingrese un correo electrónico válido.');
        return ok;
    }

    phone.addEventListener('input', validatePhone);
    email.addEventListener('input', validateEmail);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Honeypot: un humano nunca ve ni completa este campo
        if (form.elements.sitio_web && form.elements.sitio_web.value !== '') {
            form.reset();
            return;
        }

        validatePhone();
        validateEmail();
        if (!form.checkValidity()) {
            form.reportValidity();
            setStatus('Revise los campos marcados: hay datos incompletos o con formato inválido.', 'error');
            return;
        }

        const nombre = form.elements.nombre.value.trim();
        const mail = email.value.trim();
        const telefono = phone.value.trim();
        const servicioSelect = form.elements.servicio;
        const servicio = servicioSelect.options[servicioSelect.selectedIndex].text;
        const vehiculoSelect = form.elements.vehiculo;
        const vehiculo = vehiculoSelect.value ? vehiculoSelect.options[vehiculoSelect.selectedIndex].text : '';
        const mensaje = form.elements.mensaje.value.trim();

        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-disabled', 'true');
        setStatus('Preparando su solicitud…', 'info');

        const whatsappMessage = [
            '*SOLICITUD DE SERVICIO - LABORATORIO DIESEL MG*',
            '',
            `*Nombre:* ${nombre}`,
            `*Email:* ${mail}`,
            `*Teléfono:* ${telefono}`,
            vehiculo ? `*Vehículo:* ${vehiculo}` : null,
            `*Servicio:* ${servicio}`,
            mensaje ? `*Descripción:*\n${mensaje}` : null,
            '',
            '_Enviado desde el formulario de contacto_'
        ].filter(line => line !== null).join('\n');

        try {
            // Mismo destino que antes (wa.me/593), abierto con noopener
            const link = document.createElement('a');
            link.href = `https://wa.me/593?text=${encodeURIComponent(whatsappMessage)}`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            link.remove();

            setStatus('¡Gracias! Lo hemos redirigido a WhatsApp. Por favor, envíe el mensaje.', 'success');
            form.reset();
        } catch (err) {
            setStatus('No pudimos abrir WhatsApp. Inténtelo de nuevo o escríbanos a los números de contacto.', 'error');
        }

        setTimeout(function() {
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-disabled');
        }, SUBMIT_COOLDOWN_MS);
    });
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
    document.body.classList.remove('offline');
});

window.addEventListener('offline', function() {
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
