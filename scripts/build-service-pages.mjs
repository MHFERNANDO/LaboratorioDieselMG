// Genera las páginas estáticas de servicio (una carpeta con index.html por servicio).
// Uso: node scripts/build-service-pages.mjs
// El contenido vive en scripts/service-pages-content.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from './service-pages-content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.laboratoriodieselmg.com';
const WA_TALLER = '593988373185';
const waLink = text => `https://wa.me/${WA_TALLER}?text=${encodeURIComponent(text)}`;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const gallery = {
  'bombaRotativa-480': [480, 479, 'Reparación Bomba Rotativa', 'Bomba Rotativa', 'Sistemas Distribución', 'Mantenimiento preventivo y correctivo de bombas tipo VE, garantizando una entrega de combustible uniforme.'],
  'bombaCrdi-342': [342, 296, 'Reparación Bomba Common Rail', 'Bomba CRDI', 'Tecnología Common Rail', 'Reacondicionamiento de bombas de alta presión con calibración de válvulas reguladoras y caudal.'],
  'bombaVP44-462': [462, 355, 'Diagnóstico Bomba VP44', 'Bomba VP44', 'Inyección Electrónica', 'Reparación especializada de módulos electrónicos y mecánica interna con simulación de banco.'],
  'bombaP-327': [327, 221, 'Mantenimiento Bomba Lineal P', 'Bomba P (Lineal)', 'Servicio Pesado', 'Ajuste de gobernadores y sincronización de elementos para motores diesel de gran cilindrada.'],
  'inyectoresCdi-458': [458, 442, 'Reparación Inyectores Common Rail', 'Inyectores CRDI', 'Inyección Directa', 'Calibración electrónica de inyectores piezoeléctricos y electromagnéticos bajo normas de fabricante.'],
};

const sprite = `<svg class="sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 5h16" /> <path d="M4 12h16" /> <path d="M4 19h16" /></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18" /> <path d="m6 6 12 12" /></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"><path d="M5 12h14" /> <path d="M12 5v14" /></symbol>
</svg>`;

const nav = '<li><a href="/#inicio">Inicio</a></li><li><a href="/#servicios">Servicios</a></li><li><a href="/#sistemas">Sistemas</a></li><li><a href="/#equipos">Equipos</a></li><li><a href="/#faq">Preguntas</a></li><li><a href="/#contacto">Contacto</a></li>';

const header = `    <header class="site-header" id="siteHeader">
        <div class="container nav-content">
            <a href="/" class="logo" aria-label="Laboratorio Diesel MG, inicio">
                <img src="/assets/logo-sm.webp" alt="" class="logo-img" width="168" height="134">
            </a>
            <nav class="primary-nav" aria-label="Principal">
                <ul class="nav-links">
                    ${nav}
                </ul>
            </nav>
            <button type="button" class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobileNav">
                <span class="icon-open"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-menu"/></svg></span>
                <span class="icon-close"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-x"/></svg></span>
            </button>
        </div>
    </header>

    <div class="mobile-nav" id="mobileNav">
        <ul>
            ${nav}
        </ul>
    </div>`;

const footer = `    <footer class="footer">
        <div class="container">
            <div class="footer-top">
                <div class="footer-brand">
                    <p class="footer-name">Laboratorio Diesel MG</p>
                    <p>Diagnóstico, calibración y reparación de sistemas de inyección diesel.</p>
                </div>
                <nav aria-label="Pie de página">
                    <ul class="footer-nav">
                        <li><a href="/#inicio">Inicio</a></li><li><a href="/#servicios">Servicios</a></li><li><a href="/#sistemas">Sistemas</a></li><li><a href="/#equipos">Equipos</a></li><li><a href="/#faq">Preguntas</a></li><li><a href="/#contacto">Contacto</a></li>
                    </ul>
                </nav>
            </div>
            <p class="footer-nap">Laboratorio Diesel MG · Calle Vieja 922 y Mercedes Quinde, Cuenca · tel. taller <a href="tel:+593988373185">0988373185</a> y oficina <a href="tel:+593991231310">0991231310</a></p>
            <p class="footer-bottom">© <span data-year>2026</span> Laboratorio Diesel MG</p>
        </div>
    </footer>

    <a class="wa-float" href="${waLink('Hola, me gustaría cotizar un servicio en el taller.')}" target="_blank" rel="noopener noreferrer" aria-label="Cotizar con el taller por WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M20.52 3.48C18.31 1.27 15.26 0 12 0 5.48 0 0.07 5.41 0.07 11.93c0 2.1.55 4.15 1.6 5.97L0 24l6.35-1.67c1.75.96 3.73 1.47 5.73 1.47 6.54 0 11.93-5.42 11.93-11.93 0-3.19-1.24-6.19-3.49-8.44zM12 21.85c-1.79 0-3.54-.47-5.07-1.36l-.36-.21-3.74.98.99-3.63-.23-.37C2.62 15.52 2.1 13.76 2.1 11.93c0-5.45 4.43-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9 1.87 1.87 2.9 4.35 2.9 6.99 0 5.45-4.43 9.88-9.89 9.88zm5.41-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.19-.57-.35z"/></svg>
    </a>`;

const faqItem = ([q, a]) => `                <details class="faq-item" name="faq" data-line>
                    <summary class="faq-question">
                        <h3>${esc(q)}</h3>
                        <span class="faq-icon" aria-hidden="true"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-plus"/></svg></span>
                    </summary>
                    <div class="faq-answer">
                        <p>${esc(a)}</p>
                    </div>
                </details>`;

const fig = f => {
  const [w, h, alt, t, cat, p] = gallery[f];
  return `                <figure class="gallery-card">
                    <div class="gallery-media" data-photo>
                        <picture>
                            <source type="image/avif" srcset="/assets/${f}.avif ${w}w" sizes="(min-width: 960px) 360px, (min-width: 600px) 45vw, 100vw">
                            <source type="image/webp" srcset="/assets/${f}.webp ${w}w" sizes="(min-width: 960px) 360px, (min-width: 600px) 45vw, 100vw">
                            <img src="/assets/${f}.webp" alt="${alt}" class="gallery-image" width="${w}" height="${h}" loading="lazy" decoding="async">
                        </picture>
                    </div>
                    <figcaption>
                        <h3>${t}</h3>
                        <span class="gallery-category">${cat}</span>
                        <p>${p}</p>
                    </figcaption>
                </figure>`;
};

const wordCounts = {};

for (const pg of pages) {
  const url = `${SITE}/${pg.slug}/`;
  const wa = waLink(`Hola, me gustaría cotizar ${pg.wa} para mi vehículo.`);

  const blocks = pg.sections.map(([h2, parts]) => {
    const body = parts.map(x => Array.isArray(x)
      ? `<ul class="prose-list">${x.map(li => `<li>${esc(li)}</li>`).join('')}</ul>`
      : `<p>${esc(x)}</p>`).join('\n                        ');
    return `                <div class="prose-block">
                    <h2>${esc(h2)}</h2>
                    <div class="prose-body">
                        ${body}
                    </div>
                </div>`;
  }).join('\n');

  const text = [pg.lead, ...pg.sections.flatMap(([h, ps]) => [h, ...ps.flat()]), ...pg.faq.flat()].join(' ');
  wordCounts[pg.slug] = text.split(/\s+/).filter(Boolean).length;

  const hasImages = pg.images.length > 0;
  const gallerySection = hasImages ? `
    <section id="relacionado" class="section section--white gallery">
        <div class="container">
            <div class="section-header">
                <h2 data-split>Sistemas relacionados</h2>
                <p>Fotos de referencia del tipo de componente que se atiende en este servicio.</p>
            </div>
            <div class="gallery-grid">
${pg.images.map(fig).join('\n')}
            </div>
        </div>
    </section>
` : '';

  const others = pages.filter(p => p.slug !== pg.slug);
  const crumbs = [['Inicio', `${SITE}/`], ['Servicios', `${SITE}/#servicios`], [pg.nav, url]];

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: pg.title, description: pg.desc, inLanguage: 'es-EC', isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#negocio` }, breadcrumb: { '@id': `${url}#breadcrumb` } },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: crumbs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
      { '@type': 'Service', '@id': `${url}#service`, name: pg.serviceName, description: pg.desc, serviceType: pg.serviceName, url, provider: { '@id': `${SITE}/#negocio` }, areaServed: { '@type': 'City', name: 'Cuenca' } },
      { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntityOfPage: { '@id': `${url}#webpage` }, mainEntity: pg.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };

  if (pg.title.length > 60) throw new Error(`title >60 (${pg.title.length}): ${pg.slug}`);
  if (pg.desc.length > 155) throw new Error(`desc >155 (${pg.desc.length}): ${pg.slug}`);

  const faqBg = hasImages ? 'section--paper' : 'section--white';

  const html = `<!DOCTYPE html>
<html lang="es-EC">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${esc(pg.title)}</title>
    <meta name="description" content="${esc(pg.desc)}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#111111">

    <meta name="geo.region" content="EC-A">
    <meta name="geo.placename" content="Cuenca, Azuay, Ecuador">
    <meta name="geo.position" content="-2.8881689;-78.9912038">
    <meta name="ICBM" content="-2.8881689, -78.9912038">

    <link rel="canonical" href="${url}">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Laboratorio Diesel MG">
    <meta property="og:locale" content="es_EC">
    <meta property="og:title" content="${esc(pg.title)}">
    <meta property="og:description" content="${esc(pg.desc)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${SITE}/assets/og-image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Fachada de Laboratorio Diesel MG en Cuenca, Ecuador, con el logotipo del laboratorio">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(pg.title)}">
    <meta name="twitter:description" content="${esc(pg.desc)}">
    <meta name="twitter:image" content="${SITE}/assets/og-image.jpg">
    <meta name="twitter:image:alt" content="Fachada de Laboratorio Diesel MG en Cuenca, Ecuador, con el logotipo del laboratorio">

    <link rel="icon" href="/favicon.ico" sizes="48x48">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/assets/icon-192.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">

    <link rel="preload" href="/fonts/archivo-var-latin.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="/css/styles.css">
    <script src="/js/boot.js"></script>
    <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
    </script>
</head>
<body>

    <a class="skip-link" href="#main">Saltar al contenido</a>

    ${sprite}

${header}

    <main id="main">

    <section id="inicio" class="section section--ink page-hero">
        <div class="container">
            <nav class="crumbs" aria-label="Migas de pan">
                <ol>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/#servicios">Servicios</a></li>
                    <li aria-current="page">${esc(pg.nav)}</li>
                </ol>
            </nav>
            <h1 data-split>${esc(pg.h1)}</h1>
            <p class="hero__lead">${esc(pg.lead)}</p>
            <div class="hero__actions" data-hero-cta>
                <a href="${wa}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp</a>
                <a href="/#contacto" class="link-underline">Contacto y ubicación</a>
            </div>
        </div>
    </section>

    <section id="servicio" class="section section--paper prose">
        <div class="container">
${blocks}
        </div>
    </section>
${gallerySection}
    <section id="faq" class="section ${faqBg} faq">
        <div class="container faq-layout">
            <h2 data-split>Preguntas frecuentes</h2>
            <div class="faq-list">
${pg.faq.map(faqItem).join('\n')}
            </div>
        </div>
    </section>

    <section id="cotizar" class="section section--ink page-cta">
        <div class="container">
            <div class="section-header">
                <h2 data-split>Solicite su cotización</h2>
                <p>Escríbanos por WhatsApp al taller con el servicio que necesita. Estamos en Calle Vieja 922 y Mercedes Quinde, Cuenca.</p>
            </div>
            <div class="hero__actions">
                <a href="${wa}" class="btn btn-primary btn-large" target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp</a>
                <a href="/#contacto" class="link-underline">Teléfonos, horario y mapa</a>
            </div>
            <p class="quick-title">Otros servicios</p>
            <ul class="quick-list">
${others.map(o => `                <li><a class="link-underline" href="/${o.slug}/">${esc(o.nav)}</a></li>`).join('\n')}
            </ul>
        </div>
    </section>

    </main>

${footer}

    <script src="/js/script.js" defer></script>
</body>
</html>
`;
  const dir = path.join(root, pg.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
console.log(wordCounts);
