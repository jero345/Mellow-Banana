# Mellow & Banana — Web

Sitio de la consultora, montado **tal cual las artboards de `MELLOW WEB V2.pdf`**.

React 19 + Vite 8 + Tailwind CSS 4 + React Router 7 + Motion. Sin dependencias
de UI: todo el sistema visual sale del PDF (color, tipografía, retículas, gestos).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # sirve el build
```

---

## Rutas

| Ruta          | Artboard del PDF                | Notas                                                    |
| ------------- | ------------------------------- | -------------------------------------------------------- |
| `/`           | pág. 1 — Home                   | hero + reel, carrusel de proyectos destacados, clientes  |
| `/privacidad`, `/cookies`, `/terminos` | — | páginas legales (placeholder hasta que el cliente mande los textos) |
| `/work`       | (implícita en “Ver más (+)”)    | grilla filtrable por Marca / Estrategia / Empaque        |
| `/work/:slug` | pág. 2 — caso Federación        | caso completo por datos; los demás con portada + intro   |
| `/about`      | pág. 3 — About                  | secciones 01→05                                          |
| `/contact`    | pág. 4 — Contact                | tabla de contacto + formulario en la banda amarilla      |

Es una SPA: cualquier host necesita reescribir todo a `index.html`. Ya están
`public/_redirects` (Netlify) y `vercel.json` (Vercel).

## Sistema de diseño

Tokens en `src/index.css` (`@theme`), tomados por muestreo del PDF:

- **Negro** `#000000` · **Amarillo** `#FFF103` (muestreado del PDF, un solo acento) ·
  **Papel** `#F4F5F6` (fondo de la sección clara).
- **Tipografía**: las 4 fuentes del paquete (`Favorit` Light/Regular, `ABC Favorit`
  Bold, `Founders Grotesk` Light) en `public/fonts`, declaradas como una sola
  familia `Favorit` con pesos 300/400/700.
- **Escala fluida** derivada del artboard de 1651 px: `text-display` (4.55vw),
  `text-title`, `text-tagline`, `text-lead`, `text-body`, `text-meta`. Al ser `vw`,
  las proporciones del diseño se mantienen en cualquier ancho.
- **Retícula**: utilidad `shell` = margen de 3.9 % del artboard, máx. 1760 px.
- **Curva de animación**: `ease-brand` (`cubic-bezier(.22,1,.36,1)`), la misma
  que `EASE` en `src/motion/tokens.js`.

## Sistema de movimiento

Todo el motion sale del mismo vocabulario (`src/motion/tokens.js`: una curva, una
escala de duraciones, tres springs), para que la página se sienta como un solo
objeto y no como una pila de efectos suelta.

| Pieza                | Qué hace                                                                 |
| -------------------- | ------------------------------------------------------------------------ |
| `Intro`              | Primera carga: el wordmark se revela con un wipe sobre negro y el panel sube. Una vez por sesión. |
| `PageTransition`     | Persiana de marca entre rutas: baja tapando con el monograma, sube revelando. El scroll se resetea con la pantalla cubierta, así el salto nunca se ve. |
| `AnimatedText`       | Titulares palabra por palabra, cada una subiendo dentro de su propia caja de recorte. |
| `RevealImage`        | Las imágenes se desenmascaran hacia arriba, se asientan desde un sobre-escalado y luego derivan contra el scroll. |
| `Reveal`             | Fade-and-rise discreto para cuerpo de texto y chips.                      |
| `Magnetic`           | Botones que se inclinan hacia el cursor y vuelven con spring.             |
| `Cursor`             | Anillo amarillo que persigue el puntero y crece sobre lo interactivo.     |
| `ScrollProgress`     | Hairline amarillo de progreso arriba.                                     |
| `HeroVideo`          | El video se hunde y el scrim se cierra a medida que el hero sale.         |
| Hero                 | El titular se desvanece y el orbe deriva y se encoge con el scroll; el bloom respira y un anillo pulsa en reposo. |
| About → pilares      | En pantallas anchas el título y la descripción quedan fijos mientras sus tres casos pasan al lado. |
| Menú móvil           | El panel se abre con un clip-path y cada ítem sube desde su caja.         |
| `FooterReveal`       | Al final del scroll el footer se desliza y destapa una banda amarilla con el wordmark gigante en negro (como el footer de saffron-consultants.com). |

**Reduced motion**: `<MotionConfig reducedMotion="user">` envuelve toda la app,
así que cada componente lo respeta sin chequearlo por su cuenta. Con la
preferencia activa no hay intro, ni persiana, ni cursor, ni barra de progreso, ni
parallax: la página queda estática y completa.

### El footer que se destapa (`FooterReveal`)

El footer sigue el mockup del cliente: claim "Brands that matters" + botón
"Conversemos" arriba (reemplaza a la banda amarilla `CtaBand`, que ahora solo
usa Contact para alojar el formulario), oficina y "Trabaja con nosotros" en el
medio, y la línea legal abajo. Debajo, la banda amarilla con el wordmark.

Es puro CSS, copiado del mecanismo de Saffron: la banda con el wordmark es el
**último elemento del documento** con `position: sticky; bottom: 0`, así que
queda pegada al borde inferior del viewport durante todo el scroll, y la página
(que es opaca) pasa por encima hasta descubrirla al final.

Va con `z-index` **negativo** en vez de subir `<main>` a un stacking context
propio: el modal del reel se renderiza dentro de la página sin portal, y un
`z-index` en `<main>` lo dejaría atrapado debajo del header. Por eso `<main>`
lleva `bg-ink` explícito: todo lo que va encima de la banda tiene que ser opaco.

Si algún día un ancestro de la banda recibe `overflow: hidden`, el sticky deja
de funcionar. El `overflow-x: hidden` del `body` no molesta porque se propaga al
viewport.

### Dos trampas que ya costaron caro

**1. `whileInView` no hace nada en motion 13.** El build ESM que consume Vite no
incluye ese gesto: el prop se acepta y se ignora en silencio, así que el elemento
se queda en su `initial` para siempre — y en un reveal enmascarado eso significa
**invisible**. Los gráficos solo aparecían al recargar la página.

Por eso todo el scroll-reveal pasa por el hook `useInView`, detrás de
`src/motion/useReveal.js`. **No vuelvas a `whileInView`** sin comprobar antes que
la feature exista en el bundle.

Un detalle más: `useInView` necesita el ref en un elemento **normal**, no en un
componente `motion`. En `RevealImage` la caja medida es un `<div>` plano y la
máscara vive en un hijo `motion`.

**2. `AnimatePresence initial={false}` apaga las animaciones de entrada de todo
su subárbol en el primer render.** Eso hacía que una carga directa pintara todo
en su estado final y se viera perfecta, ocultando el bug de arriba: solo se
notaba al navegar con clics. Hoy dentro de `AnimatePresence` va **solo la
persiana**; las rutas son hermanas, no descendientes.

> Moraleja para verificar: probar cada ruta con `goto` **no alcanza**. Hay que
> llegar a las páginas **haciendo clic**, que es lo que hace la gente. El script
> `navcheck` de esta sesión existe justamente para eso.

## Gestos que vienen dibujados en el PDF

- **`CursorLabel`** — la píldora amarilla que sigue al cursor: círculo “Ver” sobre
  las tarjetas de proyectos recientes y píldora con el nombre del proyecto en la
  grilla de Work / “Más Proyectos”.
- **`ProjectCarousel`** — diapositiva centrada con las vecinas en gris y las
  flechas amarillas sobre la costura. Usa scroll-snap nativo, así que arrastre
  táctil y teclado funcionan sin JS extra.
- **`HeroVideo`** — el reel corriendo de fondo en el hero: corte sin audio, en
  loop, que aparece con fade sobre su poster. Va **a color, sin velo ni
  degradado de ningún tipo** (pedido del cliente): el reel se ve tal cual.
  Sirve 720p en pantallas angostas y 1080p desde 1024 px, y con
  `prefers-reduced-motion` o Data Saver no carga video: solo el poster.
- **`ReelModal`** — el orbe “Play Reel” abre el reel completo con audio. Ese
  archivo solo se descarga al abrir el modal, no en la carga inicial.
- **`ClientWall`** — el muro de clientes, con el arte original del PDF.
- **`Reveal`** — aparición al entrar en viewport, un observer por elemento que se
  desconecta al disparar.
- **Es/En** — el switch del header está en las cuatro artboards; toda la copia
  vive en `src/i18n/dictionary.js`. Español es el idioma por defecto.

Todo respeta `prefers-reduced-motion`.

## Contenido

Nada de copy está incrustado en los componentes:

- `src/data/site.js` — contacto, redes, nav, capacidades, sectores, clientes.
- `src/data/projects.js` — catálogo de proyectos y casos de estudio.
- `src/i18n/dictionary.js` — copy de interfaz en ES/EN.

### Agregar un proyecto

Añade una entrada en `projects` con `slug`, `client`, `tagline`, `sector`,
`categories`, `cover` e `intro`. Con eso ya aparece en `/work`, en “Más
Proyectos” y tiene su página. Para el caso de estudio completo, agrega `blocks`
—cada bloque es datos, no markup:

| `kind`  | Layout                                    |
| ------- | ----------------------------------------- |
| `text`  | párrafos a media caja                     |
| `full`  | imagen a todo el ancho (`contain: true` para no recortar) |
| `duo`   | dos columnas iguales                      |
| `split` | dos columnas 66/33                        |
| `trio`  | tres columnas                             |

Los campos de texto son pares `{ es, en }`; `f(campo)` resuelve el idioma activo.

## Assets

Extraídos del PDF con PyMuPDF, no recreados:

- `src/brand/wordmark.svg`, `monogram.svg` — los **trazos vectoriales originales**
  del logo, en línea para que hereden `currentColor`.
- `public/assets/*.jpg` — imágenes de los casos, recortadas a los límites de cada
  pieza del artboard.
- `public/assets/clients-*.png` — el muro de clientes, pasado a marcas negras
  sobre fondo transparente, para que funcione en claro (tal cual) y en oscuro
  (`invert`).

### Video

`REEL25.mp4` venía a 12.4 Mbps / 100 MB (1920×1080, 62 s), inservible para web.
Se reencodeó con ffmpeg a cuatro entregables en `public/media`:

| Archivo               | Peso     | Uso                                     |
| --------------------- | -------- | --------------------------------------- |
| `hero-loop-1080.mp4`  | 6.19 MB  | fondo del hero, ≥1024 px, sin audio     |
| `hero-loop-720.mp4`   | 3.52 MB  | fondo del hero, <1024 px, sin audio     |
| `reel.mp4`            | 13.45 MB | reel completo con audio, solo el modal   |
| `reel-poster.jpg`     | 0.09 MB  | poster (frame 30 s, oscuro y filmico)   |

Todos con `-movflags +faststart` para que empiecen a reproducir sin descargar
completo. Si más adelante quieren servirlo desde Mux / Cloudflare Stream, solo
cambian los `src` en `HeroVideo.jsx` y `ReelModal.jsx`.

## Pendientes que dependen de ustedes

1. **El formulario abre un borrador de correo** (`mailto:`) porque no hay backend.
   En `ContactForm.jsx`, reemplaza `submit` por un `fetch` a su endpoint
   (Formspree, Resend, webhook de n8n) cuando exista.
2. **El panel “Anterior”** de la comparación tipográfica está **vacío en el PDF**,
   así que se publica solo el panel “Nuevo”. Cuando tengan el arte, agréguenlo
   como segundo item y cambien ese bloque a `kind: 'duo'`.
3. **Casos de estudio**: solo Federación viene completo en el PDF. Los otros siete
   proyectos tienen portada e intro y esperan sus `blocks`.
4. **Sección 05 “El Equipo”**: el PDF solo trae la foto del estudio. Si quieren
   retratos individuales, es una grilla más en `About.jsx`.
5. **Redes**: las URLs en `site.js` son las probables — confírmenlas.

## Verificado

Con navegador headless, en 390 / 834 / 1512 px y en las cinco rutas:

- 0 errores de consola, 0 requests fallidos, 0 imágenes rotas.
- Sin desborde horizontal (`scrollWidth === innerWidth`).
- Todos los `Reveal` disparan; las 4 fuentes cargan.
- Menú móvil abre, navega y libera el scroll; switch Es/En cambia copy y
  `<html lang>`; el reel abre, carga y cierra con `Esc`; flechas y filtros del
  carrusel responden.
- Fondo del hero: reproduce en desktop (1080p) y en móvil (720p, sin bajar el
  1080p); con `prefers-reduced-motion` no carga video, solo el poster.
- Contraste del titular sobre el fondo de video, medido en los frames más claro
  y más oscuro del reel: 9.1:1 y 17.3:1 (mínimo requerido 3:1).
- **Motion**: en las 5 rutas × 2 anchos se recorre la página entera y se verifica
  que cada nodo animado llegue a su estado final — 0 palabras atascadas fuera de
  su caja, 0 imágenes sin desenmascarar, 0 titulares sin altura (324 palabras,
  102 marcos, 76 titulares). Es la comprobación que importa: un trigger que no
  dispara deja el contenido invisible.
- **Navegación con clics**: además de cargar cada ruta directo, se llega a Work,
  About, Contact y a un proyecto **haciendo clic**, y se vuelve a verificar que
  nada quede enmascarado. Este es el chequeo que atrapó el bug de
  `whileInView`; la carga directa sola daba falso verde.
- Intro corre una vez, libera el scroll y no se repite en la sesión; la persiana
  cubre a mitad de navegación y el scroll queda en 0 al llegar; el anillo del
  cursor pasa de 18 px a 44 px sobre un enlace; el filtro de Work rehace la
  grilla (5 tarjetas, 5 desenmascaradas).
- Con `prefers-reduced-motion` las 5 rutas quedan estáticas y completas: sin
  intro, persiana, cursor ni progreso, y ningún elemento oculto.
- Build de producción sirve rutas profundas correctamente. `dist/` pesa 29.8 MB
  en total; la primera carga en desktop es ~142 KB gzip de app + poster + el
  loop de 6.19 MB.
