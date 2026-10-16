# Laboratorio Diesel MG — plan de diseño (v2)

Dirección: taller de precisión real. Sobrio, plano, tipográfico. Lo memorable es la fotografía de bombas e inyectores; el resto queda quieto.

## Paleta (recuperada del CSS original, commit b12315f; no se inventa ningún color)
- `--red #c41e3a` marca · `--red-strong #a11930` (−8% L, hover/active) · `--red-tint #e13e59` (+12% L, texto pequeño y foco sobre oscuro).
- `--ink #111111` (original gray-900) · `--ink-2 #1a1a1a` (gray-800) · footer `#0c0c0c` (ink más profundo).
- `--steel #888888` (gray-400, secundario sobre ink) · `--steel-ink #555555` (gray-500, secundario sobre paper).
- `--paper #f0f0f0` (gray-100, mismo matiz neutro que ink) · `--line` blanco 12% / ink 16%.
- Rojo escaso: CTA, enlaces, activo, foco, marca corta (16×2px). Contraste: blanco/rojo 5.8, rojo/paper 5.1, rojo/ink 3.2 (solo UI/texto grande; texto pequeño usa red-tint 4.5).
- Logo: carmesí oscuro (~#480000–#93141c) y plata (~#c1c3c9) sobre pizarra; coherente con rojo + grises.

## Tipografía
Archivo variable, única familia (woff2 latin, wdth 75–100, wght 400–800, preload). Titulares wdth 80, 700–800, tracking −0.01em, sentence case. Texto wdth 100, 400/500, 17px, 1.6, ≤62ch. h1 2.75→5rem, h2 2→3.25rem, h3 1.25→1.5rem.

## Layout
Izquierda, contenedor 1200px, grid de 12 columnas, secciones clamp(5rem,10vw,9rem).
Ritmo: hero ink · quiénes paper · servicios paper · equipos ink · consejos paper · galería paper · FAQ paper · contacto/ubicación ink · footer ink profundo. Tramos paper contiguos se separan con una línea.
Radios: fotos y secciones 0; botones/inputs 3px; botón flotante de WhatsApp circular (única excepción).

## Componentes
Header ink sólido; compacta con transform + borde. Hero con foto sangrando a la derecha. Quiénes: 2 columnas + franja de 4 columnas con líneas verticales. Servicios: filas con línea (h3 4 col / texto 7 col). Equipos: 2 columnas, líneas, origen en steel. Consejos: 3 columnas de texto con marca roja. Galería: editorial asimétrica (1 foto 2×2, resto 4/5 y 3/2), caption debajo. FAQ: details con +. Contacto: form ink-2 + datos con iconos funcionales; mapa en grises.

## Movimiento (solo transform, opacity, clip-path)
Carga: líneas del H1 suben (700ms, 80ms), foto del hero clip-path (1000ms), CTA (400ms, +300ms). Fotos: clip-path + escala 1.08→1. h2 por líneas (500ms). Filas 450ms/50ms; líneas scaleX 600ms. FAQ 200/150ms. Sin parallax, contadores ni barra de progreso. Reduced motion: solo opacity 200ms.

## Revisión contra PROHIBIDO
- Tarjetas con radio/sombra/hover elevado → eliminadas (filas y columnas con líneas).
- Íconos decorativos → solo teléfono, WhatsApp, email, horario, ubicación (contacto), menú, FAQ y botón flotante.
- Radios >4px, etiquetas en mayúsculas sobre títulos, numeración 01–06, mono, "→", "·", palabra resaltada, gradientes, glass, sombras → eliminados.
- Fade-up global → no; solo las animaciones listadas arriba.
