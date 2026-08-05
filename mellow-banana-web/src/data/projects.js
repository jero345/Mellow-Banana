/**
 * Project catalogue.
 *
 * Every human-readable field is a { es, en } pair so the Es/En switch in the
 * header can drive the whole site. Case studies are described as a list of
 * layout `blocks`, which <Project> renders in order — that keeps the long
 * Federación artboard reproducible without hard-coding a bespoke page.
 *
 * Block kinds:
 *   { kind: 'text',  copy: [{es,en}, …] }            half-width paragraph stack
 *   { kind: 'full',  src, alt, ratio? }              full-bleed image
 *   { kind: 'duo',   items: [{src, alt}, …] }        two columns (equal)
 *   { kind: 'split', items: [a, b], bias: 'left' }   two columns (66/33)
 *   { kind: 'trio',  items: [{src, alt}, …] }        three columns
 *   { kind: 'compare', items: [a, b], labels }       two labelled cards
 *   { kind: 'video', src, poster }                   inline muted loop
 */

export const CATEGORIES = ['marca', 'estrategia', 'empaque']

export const projects = [
  /* ───────────────────────── Federación Colombiana de Fútbol ───────────── */
  {
    slug: 'fcf',
    featured: true,
    year: 2024,
    client: { es: 'Federación\nColombiana de Fútbol', en: 'Federación\nColombiana de Fútbol' },
    shortTitle: { es: 'Federación Colombiana de Fútbol', en: 'Federación Colombiana de Fútbol' },
    tagline: { es: 'EL RITMO\nQUE NOS UNE', en: 'THE RHYTHM\nTHAT UNITES US' },
    sector: { es: 'Deporte', en: 'Sport' },
    categories: ['marca', 'estrategia'],
    cover: '/assets/fcf-hero.jpg',
    coverAlt: {
      es: 'Jugadores de la Selección Colombia abrazados antes del partido',
      en: 'Colombia national team players embracing before kick-off',
    },
    intro: [
      {
        es: 'El fútbol es parte de nuestro día a día. Es ese conector, que sin importar el contexto político, social, económico o religioso, logra compactarnos como uno solo. Y eso es la Selección: unión, equipo, un vínculo con el que nos identificamos.',
        en: 'Football is part of our everyday life. It is the connector that — regardless of political, social, economic or religious context — pulls us together as one. And that is what the national team is: unity, a team, a bond we identify with.',
      },
      {
        es: 'Así, entendimos que este deporte tiene el potencial de generar grandes cambios, de ser un fenómeno transformador, un referente cultural, un reflejo de lo que somos, un lazo de unión.',
        en: 'So we understood that this sport has the potential to drive real change: to be a transformative phenomenon, a cultural reference, a reflection of who we are, a tie that binds.',
      },
    ],
    blocks: [
      {
        kind: 'full',
        src: '/assets/fcf-cover.jpg',
        alt: {
          es: 'Portada del caso: El ritmo que nos une',
          en: 'Case cover: The rhythm that unites us',
        },
      },
      {
        kind: 'text',
        copy: [
          {
            es: 'A pocos meses de cumplir 100 años, la Federación Colombiana de Fútbol necesitaba un cambio. Un escudo que con más de 30 años, exigía una renovación, una modernización, una transformación. Una nueva imagen que, sin perder su identidad, comenzara a conectar con los colombianos y los hiciera sentir parte de su esencia, de su historia. Y así comenzó el reto.',
            en: 'A few months short of its 100th anniversary, the Colombian Football Federation needed a change. A crest more than 30 years old was asking for renewal, modernisation, transformation. A new image that — without losing its identity — would start to connect with Colombians and make them feel part of its essence, of its history. And so the challenge began.',
          },
        ],
      },
      {
        kind: 'split',
        bias: 'left',
        items: [
          {
            src: '/assets/fcf-crest-old.jpg',
            alt: { es: 'Escudo bordado en la camiseta', en: 'Crest embroidered on the shirt' },
          },
          {
            src: '/assets/fcf-james.jpg',
            alt: { es: 'Jugador con la camiseta de la Selección', en: 'Player in the national team shirt' },
          },
        ],
      },
      {
        kind: 'trio',
        items: [
          {
            src: '/assets/fcf-card-gisela.jpg',
            alt: { es: 'Pieza #SomosColombia con Gisela Robledo', en: '#SomosColombia piece featuring Gisela Robledo' },
          },
          {
            src: '/assets/fcf-card-gool.jpg',
            alt: { es: 'Pieza de gol para redes sociales', en: 'Goal announcement social piece' },
          },
          {
            src: '/assets/fcf-card-fifa.jpg',
            alt: { es: 'Pieza Fecha FIFA Colombia vs España', en: 'FIFA matchday piece, Colombia vs Spain' },
          },
        ],
      },
      {
        kind: 'text',
        copy: [
          {
            es: 'Era necesario una tipografía propia pensando en nuestras raíces, en nuestra historia, nos remontamos a la cultura precolombina. Esa herencia que aún sigue presente en nosotros y que hace parte de nuestra esencia.',
            en: 'A proprietary typeface was needed — one rooted in our origins and our history. We went back to pre-Columbian culture: the heritage still present in us and part of what we are.',
          },
          {
            es: 'Y así nació Leyenda Sans, una familia tipográfica que creamos junto a Bastarda, exclusivamente para esta marca. Una fuente que transmite y resalta lo que fuimos y lo que somos, y refleja un espíritu cercano, empático, pero a la vez moderno y lleno de ritmo.',
            en: 'That is how Leyenda Sans was born: a type family we created together with Bastarda, exclusively for this brand. A typeface that carries what we were and what we are, with a spirit that is close and empathetic yet modern and full of rhythm.',
          },
        ],
      },
      {
        kind: 'full',
        src: '/assets/fcf-typo-spec.jpg',
        alt: { es: 'Construcción tipográfica de Leyenda Sans', en: 'Leyenda Sans letterform construction' },
      },
      {
        kind: 'duo',
        items: [
          {
            src: '/assets/fcf-typo-red.jpg',
            alt: { es: 'Especimen tipográfico: altas, bajas y números', en: 'Type specimen: uppercase, lowercase and numerals' },
          },
          {
            src: '/assets/fcf-typo-white.jpg',
            alt: { es: 'Set completo de caracteres acentuados', en: 'Full accented character set' },
          },
        ],
      },
      {
        kind: 'full',
        src: '/assets/fcf-strip.jpg',
        alt: { es: 'Lockup tipográfico El ritmo que nos une', en: 'Typographic lockup: The rhythm that unites us' },
      },
      {
        kind: 'text',
        copy: [
          {
            es: 'Entendimos que esta es una marca que debía inspirar orgullo y sentido de pertenencia. Una marca que aprende de su pasado para comenzar a construir futuro. Una marca que entiende a su gente y que canta con ella en la tribuna.',
            en: 'We understood this had to be a brand that inspires pride and belonging. A brand that learns from its past in order to build a future. A brand that understands its people and sings with them in the stands.',
          },
        ],
      },
      {
        kind: 'trio',
        items: [
          {
            src: '/assets/fcf-kit-a.jpg',
            alt: { es: 'Aplicaciones gráficas de la marca', en: 'Brand graphic applications' },
          },
          {
            src: '/assets/fcf-kit-b.jpg',
            alt: { es: 'Piezas de comunicación de partido', en: 'Matchday communication pieces' },
          },
          {
            src: '/assets/fcf-kit-c.jpg',
            alt: { es: 'Sistema gráfico #TodosSomosColombia', en: '#TodosSomosColombia graphic system' },
          },
        ],
      },
      {
        kind: 'duo',
        items: [
          {
            src: '/assets/fcf-squad.jpg',
            alt: { es: 'Jugadores con la nueva indumentaria', en: 'Players in the new kit' },
          },
          {
            src: '/assets/fcf-james-ball.jpg',
            alt: { es: 'Jugador dominando el balón', en: 'Player controlling the ball' },
          },
        ],
      },
      {
        kind: 'full',
        src: '/assets/fcf-logo-compare.jpg',
        alt: {
          es: 'Comparación del escudo antes y ahora',
          en: 'Crest comparison, before and after',
        },
      },
      {
        kind: 'text',
        copy: [
          {
            es: 'Así es como decidimos darle una vuelta a la historia, empezando por el pentágono en el centro del balón. Girándolo, conseguimos simbolizar el hogar, la unión, la inclusión, la familia que somos.',
            en: 'This is how we decided to give history a turn, starting with the pentagon at the centre of the ball. By rotating it we came to symbolise home, unity, inclusion — the family we are.',
          },
          {
            es: 'Darle sentido a esas cinco puntas que representan los cinco pisos térmicos.',
            en: 'And to give meaning to those five points, which stand for the country’s five thermal floors.',
          },
        ],
      },
      /*
       * The artboard pairs this with an "Anterior" panel that was left empty in
       * the PDF, so only the "Nuevo" panel ships. Add the before artwork as a
       * second item and switch `kind` to 'duo' to restore the two-up comparison.
       */
      {
        kind: 'full',
        src: '/assets/fcf-after.jpg',
        alt: {
          es: 'Nuevo: la tipografía Leyenda Sans en uso',
          en: 'New: the Leyenda Sans typography in use',
        },
      },
      {
        kind: 'full',
        src: '/assets/fcf-jacket.jpg',
        alt: { es: 'Chaqueta conmemorativa 100 años bordada', en: 'Embroidered 100-year commemorative jacket' },
      },
      {
        kind: 'duo',
        items: [
          {
            src: '/assets/fcf-boots.jpg',
            alt: { es: 'Jugadora en acción', en: 'Player in action' },
          },
          {
            src: '/assets/fcf-keeper.jpg',
            alt: { es: 'Portero atajando el balón', en: 'Goalkeeper making a save' },
          },
        ],
      },
      {
        kind: 'trio',
        items: [
          {
            src: '/assets/fcf-bench.jpg',
            alt: { es: 'Banca del estadio con la nueva gráfica', en: 'Stadium bench with the new graphics' },
          },
          {
            src: '/assets/fcf-backdrop.jpg',
            alt: { es: 'Backing de prensa con patrocinadores', en: 'Press backdrop with sponsors' },
          },
          {
            src: '/assets/fcf-linda.jpg',
            alt: { es: 'Jugadora haciendo un corazón con las manos', en: 'Player making a heart with her hands' },
          },
        ],
      },
      {
        kind: 'full',
        src: '/assets/fcf-bus.jpg',
        alt: { es: 'Bus oficial de la Selección Colombia', en: 'Official Colombia national team bus' },
        contain: true,
      },
    ],
  },

  /* ───────────────────────────────── Manantial ─────────────────────────── */
  {
    slug: 'manantial',
    featured: true,
    year: 2024,
    client: { es: 'Manantial', en: 'Manantial' },
    shortTitle: { es: 'Manantial', en: 'Manantial' },
    tagline: { es: 'CUANDO LA\nPUREZA HABLA', en: 'WHEN PURITY\nSPEAKS' },
    sector: { es: 'Drinks & Foods', en: 'Drinks & Foods' },
    categories: ['marca', 'empaque'],
    cover: '/assets/proj-manantial.jpg',
    coverAlt: {
      es: 'Botella de agua Manantial con el nuevo lenguaje visual',
      en: 'Manantial water bottle with its new visual language',
    },
    intro: [
      {
        es: 'El proyecto inicia con entender la nueva percepción del concepto Premium. Lo que antes era sobre producido, desaparece para dar paso a universos mas limpios y con menos elementos. Esto fue fundamental para entender la importancia de explorar otras categorías como fuente de inspiración.',
        en: 'The project starts by understanding the new perception of Premium. What used to be over-produced gives way to cleaner universes with fewer elements. That was key to seeing how important it is to look at other categories as a source of inspiration.',
      },
    ],
  },

  /* ────────────────────────────── Club Premium ─────────────────────────── */
  {
    slug: 'club-premium',
    featured: true,
    year: 2025,
    client: { es: 'Cerveza Club Premium', en: 'Cerveza Club Premium' },
    shortTitle: { es: 'Club Premium Doble Malta', en: 'Club Premium Doble Malta' },
    tagline: { es: 'UNA NUEVA\nACTITUD', en: 'A NEW\nATTITUDE' },
    sector: { es: 'Drinks & Foods', en: 'Drinks & Foods' },
    categories: ['marca', 'empaque', 'estrategia'],
    cover: '/assets/proj-club.jpg',
    coverAlt: {
      es: 'Botella y lata de Club Premium Doble Malta',
      en: 'Club Premium Doble Malta bottle and can',
    },
    intro: [
      {
        es: 'Más que una nueva etiqueta, fue una nueva actitud. Tras liderar el rebranding de Club Premium Ecuador, asumimos el desafío de acompañar su más reciente innovación: la Doble Malta, una cerveza que nace del balance perfecto entre intensidad y frescura.',
        en: 'More than a new label, it was a new attitude. After leading the rebranding of Club Premium Ecuador, we took on the challenge of supporting its latest innovation: Doble Malta, a beer born from the perfect balance between intensity and freshness.',
      },
    ],
  },

  /* ────────────────────────────── BSC Brewing ──────────────────────────── */
  {
    slug: 'bsc-brewing',
    featured: true,
    year: 2023,
    client: { es: 'BSC Brewing Co.', en: 'BSC Brewing Co.' },
    shortTitle: { es: 'BSC Brewing Co.', en: 'BSC Brewing Co.' },
    tagline: { es: 'CERVEZA\nCON CARÁCTER', en: 'BEER WITH\nCHARACTER' },
    sector: { es: 'Drinks & Foods', en: 'Drinks & Foods' },
    categories: ['empaque', 'marca'],
    cover: '/assets/slide-beer.jpg',
    coverAlt: { es: 'Lata de cerveza Hazy IPA de BSC Brewing', en: 'BSC Brewing Hazy IPA can' },
    intro: [
      {
        es: 'Un sistema de empaque que convierte cada referencia en una pieza de colección, con una tipografía numérica que ordena el portafolio y lo hace crecer sin perder identidad.',
        en: 'A packaging system that turns every reference into a collectible, with a numeric typography that orders the portfolio and lets it grow without losing identity.',
      },
    ],
  },

  /* ──────────────────────────────────── Goo ───────────────────────────── */
  {
    slug: 'goo',
    featured: true,
    year: 2024,
    client: { es: 'Goo', en: 'Goo' },
    shortTitle: { es: 'Goo', en: 'Goo' },
    tagline: { es: 'BUEN GUSTO,\nSIN RUIDO', en: 'GOOD TASTE,\nNO NOISE' },
    sector: { es: 'Consumer Brands', en: 'Consumer Brands' },
    categories: ['marca', 'empaque'],
    cover: '/assets/slide-goo.jpg',
    coverAlt: { es: 'Identidad de marca Goo aplicada en empaque', en: 'Goo brand identity applied to packaging' },
    intro: [
      {
        es: 'Una marca construida desde el gesto: pocos elementos, mucha intención. El resultado es un lenguaje que se reconoce antes de leerse.',
        en: 'A brand built from gesture: few elements, plenty of intent. The result is a language you recognise before you read it.',
      },
    ],
  },

  /* ───────────────────────────── Home Burgers ─────────────────────────── */
  {
    slug: 'home-burgers',
    year: 2023,
    client: { es: 'Home Burgers', en: 'Home Burgers' },
    shortTitle: { es: 'Home Burgers', en: 'Home Burgers' },
    tagline: { es: 'EL SABOR\nDE VOLVER', en: 'THE TASTE\nOF COMING BACK' },
    sector: { es: 'Hospitality & Travel', en: 'Hospitality & Travel' },
    categories: ['marca', 'estrategia'],
    cover: '/assets/more-home.jpg',
    coverAlt: { es: 'Fachada del local de Home Burgers', en: 'Home Burgers storefront' },
    intro: [
      {
        es: 'Una marca de barrio que crece sin volverse cadena: arquitectura de marca, señalética y un tono que suena igual en cada punto.',
        en: 'A neighbourhood brand that grows without becoming a chain: brand architecture, signage and a tone of voice that sounds the same at every location.',
      },
    ],
  },

  /* ──────────────────────────────────── Jus ───────────────────────────── */
  {
    slug: 'jus',
    year: 2024,
    client: { es: 'Jus', en: 'Jus' },
    shortTitle: { es: 'Jus Dipping Sandwiches', en: 'Jus Dipping Sandwiches' },
    tagline: { es: 'HECHO\nPARA MOJAR', en: 'MADE\nFOR DIPPING' },
    sector: { es: 'Hospitality & Travel', en: 'Hospitality & Travel' },
    categories: ['marca'],
    cover: '/assets/more-jus.jpg',
    coverAlt: { es: 'Uniforme de Jus Dipping Sandwiches', en: 'Jus Dipping Sandwiches uniform' },
    intro: [
      {
        es: 'Un nombre corto, un gesto claro y una identidad que se entiende en la mano: el producto es el protagonista.',
        en: 'A short name, a clear gesture and an identity you understand in hand: the product is the protagonist.',
      },
    ],
  },

  /* ─────────────────────────────────── Verano ─────────────────────────── */
  {
    slug: 'verano',
    year: 2025,
    client: { es: 'Verano', en: 'Verano' },
    shortTitle: { es: 'Verano', en: 'Verano' },
    tagline: { es: 'DIBUJAR\nEL ANTOJO', en: 'DRAWING\nTHE CRAVING' },
    sector: { es: 'Consumer Brands', en: 'Consumer Brands' },
    categories: ['marca', 'empaque'],
    cover: '/assets/more-verano.jpg',
    coverAlt: { es: 'Pieza ilustrada de la marca Verano', en: 'Illustrated Verano brand piece' },
    intro: [
      {
        es: 'Ilustración como sistema: una marca que se cuenta a mano alzada y que puede seguir dibujándose sin manual.',
        en: 'Illustration as a system: a brand told freehand that can keep drawing itself without a manual.',
      },
    ],
  },
]

/** Editorial cards in the light "Proyectos Recientes" band on the home page. */
export const recent = [
  {
    slug: 'manantial',
    image: '/assets/proj-manantial.jpg',
    title: {
      es: 'Cuando la pureza habla: así redefinimos el lenguaje visual de Manantial una marca líder de agua',
      en: 'When purity speaks: how we redefined the visual language of Manantial, a leading water brand',
    },
    body: {
      es: 'El proyecto inicia con entender la nueva percepción del concepto Premium. Lo que antes era sobre producido, desaparece para dar paso a universos mas limpios y con menos elementos. Esto fue fundamental para entender la importancia de explorar otras categorías como fuente de inspiración.',
      en: 'The project starts by understanding the new perception of Premium. What used to be over-produced gives way to cleaner universes with fewer elements. That was key to seeing how important it is to look at other categories as a source of inspiration.',
    },
  },
  {
    slug: null,
    image: '/assets/proj-mellow.jpg',
    title: {
      es: 'Branding con propósito: donde cada marca tiene algo que decir y nosotros hacemos que pase.',
      en: 'Branding with purpose: every brand has something to say — and we make it happen.',
    },
    body: {
      es: 'Creemos que una marca no es solo un logo o un color: es una energía viva que conecta, evoluciona y transforma. Por eso, trabajamos desde la estrategia, la sensibilidad estética y el pensamiento humano para crear universos de marca que importan, que se sienten, que trascienden.',
      en: 'We believe a brand is not just a logo or a colour: it is living energy that connects, evolves and transforms. That is why we work from strategy, aesthetic sensibility and human thinking to create brand universes that matter, that are felt, that last.',
    },
  },
  {
    slug: 'club-premium',
    image: '/assets/proj-club.jpg',
    title: {
      es: 'La evolución de una marca ícono: rebranding y nueva Doble Malta de Club Premium',
      en: 'The evolution of an icon: rebranding and the new Club Premium Doble Malta',
    },
    body: {
      es: 'Más que una nueva etiqueta, fue una nueva actitud. Tras liderar el rebranding de Club Premium Ecuador, asumimos el desafío de acompañar su más reciente innovación: la Doble Malta, una cerveza que nace del balance perfecto entre intensidad y frescura.',
      en: 'More than a new label, it was a new attitude. After leading the rebranding of Club Premium Ecuador, we took on the challenge of supporting its latest innovation: Doble Malta, a beer born from the perfect balance between intensity and freshness.',
    },
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const featuredProjects = projects.filter((p) => p.featured)
