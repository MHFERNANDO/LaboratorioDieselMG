/* ============================================
   LABORATORIO DIESEL MG - SCRIPT PRINCIPAL
   Sin dependencias. Compatible con CSP script-src 'self'.
   Animaciones: IntersectionObserver + CSS/WAAPI (transform, opacity, clip-path).
   ============================================ */

window.__ldmgReady = true;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeScrollSpy();
    initializeHeader();
    initializeMapFacade();
    initializeFaq();
    initializeReveals();
    initializeHeadlines();
    updateYear();
});

/* ============================================
   NAVEGACIÓN ACTIVA AL HACER SCROLL
   ============================================ */

function initializeScrollSpy() {
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = Array.from(document.querySelectorAll('main > section[id]'));
    if (!links.length || !sections.length) return;

    const byId = new Map();
    links.forEach(link => byId.set(link.getAttribute('href').slice(1), link));

    let current = null;
    let ticking = false;

    // La sección activa es la última cuyo borde superior ya pasó la línea de lectura.
    // Si esa sección no tiene ítem en la navegación, no se marca nada.
    function update() {
        ticking = false;
        const line = window.innerHeight * 0.35;
        let active = sections[0];
        sections.forEach(function(section) {
            if (section.getBoundingClientRect().top <= line) active = section;
        });
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
            active = sections[sections.length - 1];
        }
        const link = byId.get(active.id) || null;
        if (link === current) return;
        links.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
        current = link;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
}

/* ============================================
   MENÚ MÓVIL (pantalla completa, aria-expanded, Esc)
   ============================================ */

function initializeMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mobileNav');
    if (!btn || !nav) return;

    function setOpen(open, returnFocus) {
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        nav.classList.toggle('open', open);
        nav.inert = !open;
        document.documentElement.classList.toggle('menu-open', open);
        if (!open && returnFocus) btn.focus();
    }

    setOpen(false);

    btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false, true);
    });

    // Al pasar a escritorio el panel deja de tener sentido
    window.matchMedia('(min-width: 900px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
}

/* ============================================
   CABECERA: se compacta con transform + borde (sin blur)
   ============================================ */

function initializeHeader() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    let ticking = false;
    function update() {
        ticking = false;
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    window.addEventListener('scroll', function() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    update();
}

/* ============================================
   TITULARES: máscara por líneas (H1 al cargar, H2 al entrar en vista)
   ============================================ */

const LINE_STAGGER_MS = 80;

// Parte un titular en líneas visuales. Conserva el texto (con espacios reales)
// y respeta saltos forzados (elementos en bloque dentro del titular).
function splitLines(el) {
    if (!el.dataset.original) el.dataset.original = el.innerHTML;
    el.innerHTML = el.dataset.original;

    const words = [];
    let segment = 0;
    (function walk(node) {
        node.childNodes.forEach(function(child) {
            if (child.nodeType === Node.TEXT_NODE) {
                child.textContent.split(/\s+/).filter(Boolean).forEach(w => words.push({ text: w, segment }));
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                if (getComputedStyle(child).display === 'block') segment++;
                walk(child);
                if (getComputedStyle(child).display === 'block') segment++;
            }
        });
    })(el);

    // Medición: un bloque por segmento, para que los saltos forzados se respeten
    el.textContent = '';
    const blocks = [];
    const spans = words.map(function(w) {
        let block = blocks[w.segment];
        if (!block) {
            block = document.createElement('span');
            block.style.display = 'block';
            el.appendChild(block);
            blocks[w.segment] = block;
        }
        const span = document.createElement('span');
        span.textContent = w.text;
        span.style.display = 'inline-block';
        block.appendChild(span);
        block.appendChild(document.createTextNode(' '));
        return span;
    });

    // Agrupar por segmento y posición vertical
    const lines = [];
    spans.forEach(function(span, i) {
        const key = words[i].segment + ':' + Math.round(span.offsetTop);
        const last = lines[lines.length - 1];
        if (last && last.key === key) last.words.push(words[i].text);
        else lines.push({ key, words: [words[i].text] });
    });

    el.textContent = '';
    el.setAttribute('aria-label', lines.map(l => l.words.join(' ')).join(' '));
    lines.forEach(function(line, i) {
        const outer = document.createElement('span');
        outer.className = 'line';
        outer.setAttribute('aria-hidden', 'true');
        outer.style.setProperty('--i', String(i));
        const inner = document.createElement('span');
        inner.className = 'line__inner';
        inner.textContent = line.words.join(' ');
        outer.appendChild(inner);
        el.appendChild(outer);
        // Espacio real entre líneas para lectores y selección de texto
        if (i < lines.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el.classList.add('is-split');
}

function initializeHeadlines() {
    const headlines = document.querySelectorAll('[data-split]');
    if (!headlines.length) return;

    // Con movimiento reducido no se parte nada: el titular se muestra tal cual
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
        headlines.forEach(el => el.classList.add('is-split', 'is-in'));
        return;
    }

    const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    const timeout = new Promise(resolve => setTimeout(resolve, 800));

    Promise.race([fontsReady, timeout]).then(function() {
        const observer = new IntersectionObserver(function(entries, obs) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                obs.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

        headlines.forEach(function(el) {
            splitLines(el);
            if (el.tagName === 'H1') el.classList.add('is-in');
            else observer.observe(el);
        });

        // Al cambiar el ancho se recalculan las líneas, sin volver a animar
        let width = window.innerWidth;
        let timer;
        window.addEventListener('resize', function() {
            clearTimeout(timer);
            timer = setTimeout(function() {
                if (window.innerWidth === width) return;
                width = window.innerWidth;
                headlines.forEach(el => {
                    const wasIn = el.classList.contains('is-in');
                    splitLines(el);
                    if (wasIn) el.classList.add('is-in');
                });
            }, 200);
        });
    });
}

/* ============================================
   FOTOS Y FILAS AL ENTRAR EN VISTA (una sola vez)
   Filas: escalonado de 50 ms entre las que entran a la vez.
   ============================================ */

const ROW_STAGGER_MS = 50;

function initializeReveals() {
    const targets = document.querySelectorAll('[data-photo], [data-row], [data-line]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('is-visible'));
        return;
    }

    // Un elemento recortado por su propio clip-path no intersecta: las fotos
    // se observan a través de su contenedor, que no está recortado.
    const watched = new Map();
    targets.forEach(function(el) {
        const watchEl = el.hasAttribute('data-photo') ? el.parentElement : el;
        watched.set(watchEl, el);
    });

    const observer = new IntersectionObserver(function(entries, obs) {
        const entering = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1);

        entering.forEach(function(entry, index) {
            const el = watched.get(entry.target);
            el.style.setProperty('--stagger', String(index));
            el.classList.add('is-visible');
            obs.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    watched.forEach((el, watchEl) => observer.observe(watchEl));
}

/* ============================================
   FAQ: apertura 200 ms, cierre 150 ms (opacity + translateY)
   ============================================ */

function initializeFaq() {
    document.querySelectorAll('.faq-item').forEach(function(item) {
        const summary = item.querySelector('summary');
        const answer = item.querySelector('.faq-answer');
        if (!summary || !answer || reducedMotion.matches || !answer.animate) return;

        summary.addEventListener('click', function(e) {
            e.preventDefault();
            if (item.open) {
                const close = answer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
                close.onfinish = () => item.removeAttribute('open');
            } else {
                item.setAttribute('open', '');
                answer.animate(
                    [{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'translateY(0)' }],
                    { duration: 200, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
                );
            }
        });
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
