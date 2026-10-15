/* ============================================
   LABORATORIO DIESEL MG - SCRIPT PRINCIPAL
   Sin dependencias. Compatible con CSP script-src 'self'.
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeScrollSpy();
    initializeWhatsAppSpeedDial();
    initializeContactForm();
    initializeMapFacade();
    updateYear();
});

/* ============================================
   NAVEGACIÓN ACTIVA AL HACER SCROLL
   ============================================ */

function initializeScrollSpy() {
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const byId = new Map();
    links.forEach(link => byId.set(link.getAttribute('href').slice(1), link));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const link = byId.get(entry.target.id);
            if (!link) return;
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, { rootMargin: '-35% 0px -55% 0px' });

    byId.forEach((link, id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
}

/* ============================================
   MENÚ MÓVIL (aria-expanded, Esc, clic fuera)
   ============================================ */

function initializeMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mobileNav');
    if (!btn || !nav) return;

    function setOpen(open, returnFocus) {
        btn.classList.toggle('open', open);
        nav.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        nav.inert = !open;
        if (!open && returnFocus) btn.focus();
    }

    setOpen(false);

    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        setOpen(!nav.classList.contains('open'));
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false, true);
    });

    document.addEventListener('click', function(e) {
        if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });

    window.addEventListener('scroll', function() {
        if (nav.classList.contains('open')) setOpen(false);
    }, { passive: true });
}

/* ============================================
   BOTÓN DE WHATSAPP (SPEED-DIAL)
   ============================================ */

function initializeWhatsAppSpeedDial() {
    const dial = document.getElementById('waSpeedDial');
    const trigger = document.getElementById('waSpeedDialTrigger');
    if (!dial || !trigger) return;

    function setOpen(open, returnFocus) {
        dial.classList.toggle('open', open);
        trigger.setAttribute('aria-expanded', String(open));
        if (!open && returnFocus) trigger.focus();
    }

    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        setOpen(!dial.classList.contains('open'));
    });

    dial.querySelectorAll('.speed-dial-btn-small').forEach(item => {
        item.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('click', function(e) {
        if (!dial.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dial.classList.contains('open')) setOpen(false, true);
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
   MAPA CON FACHADA (el iframe se carga al pedirlo)
   ============================================ */

function initializeMapFacade() {
    const btn = document.getElementById('mapLoadBtn');
    const container = document.getElementById('mapContainer');
    if (!btn || !container) return;

    btn.addEventListener('click', function() {
        const iframe = document.createElement('iframe');
        iframe.src = btn.dataset.mapSrc;
        iframe.title = 'Mapa de ubicación de Laboratorio Diesel MG en Cuenca';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allowFullscreen = true;
        iframe.className = 'map-iframe';
        container.replaceChildren(iframe);
        iframe.focus();
    });
}

/* ============================================
   UTILIDADES
   ============================================ */

function updateYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = year; });
}
