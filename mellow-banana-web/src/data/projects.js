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

  /* ─────────────────────────────────── Golty ───────────────────────────── */
  {
    slug: 'golty',
    featured: true,
    year: 2025,
    client: { es: 'Golty', en: 'Golty' },
    shortTitle: { es: 'Golty', en: 'Golty' },
    tagline: { es: 'DESPIERTA\nTU GRANDEZA', en: 'AWAKEN\nYOUR GREATNESS' },
    sector: { es: 'Deporte', en: 'Sport' },
    categories: ['marca', 'estrategia'],
    cover: '/assets/golty-hero.jpg',
    coverAlt: {
      es: 'Deportistas chocando las manos con el logo de Golty',
      en: 'Athletes high-fiving with the Golty logo',
    },
    intro: [
      {
        es: 'Una marca deportiva colombiana que tenía que hablarle por igual al fútbol profesional y a quien entrena en la cancha del barrio. Construimos un territorio donde el triunfo no es un podio: es algo que se despierta todos los días.',
        en: 'A Colombian sports brand that had to speak to professional football and to whoever trains on the neighbourhood pitch alike. We built a territory where winning is not a podium: it is something you wake up every day.',
      },
    ],
    blocks: [
      {
        kind: 'full',
        src: '/assets/golty-pitch.jpg',
        alt: {
          es: 'Balón en la cancha al atardecer con el claim Despierta tu grandeza',
          en: 'Ball on the pitch at sunset with the claim Awaken your greatness',
        },
      },
      {
        kind: 'text',
        copy: [
          {
            es: 'El sistema se apoya en un gesto simple: la marca siempre acompaña a un cuerpo en movimiento. Fotografía cercana, tipografía en diagonal y un rojo que funciona como señal, no como fondo.',
            en: 'The system rests on one simple gesture: the brand always travels with a body in motion. Close photography, type set on the diagonal and a red that works as a signal, not as a background.',
          },
        ],
      },
      {
        kind: 'full',
        src: '/assets/golty-ooh.jpg',
        alt: {
          es: 'Vallas de Golty en la ciudad y aplicación en indumentaria de tenis',
          en: 'Golty billboards in the city and the brand applied to tennis apparel',
        },
      },
      {
        kind: 'full',
        src: '/assets/golty-latir.jpg',
        alt: {
          es: 'Campaña del balón Latir, balón oficial del fútbol profesional colombiano',
          en: 'Latir campaign, official ball of Colombian professional football',
        },
      },
      {
        kind: 'text',
        copy: [
          {
            es: 'De la cancha a la calle: la misma marca sostiene el balón oficial del torneo, la valla en la ciudad y la camiseta de quien sale a correr un martes cualquiera.',
            en: 'From the pitch to the street: the same brand holds the tournament’s official ball, the billboard in the city and the shirt of whoever goes out running on any given Tuesday.',
          },
        ],
      },
      {
        kind: 'full',
        src: '/assets/golty-women.jpg',
        alt: {
          es: 'Campaña de entrenamiento femenino con indumentaria Golty',
          en: 'Women’s training campaign wearing Golty apparel',
        },
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
    blocks: [
      {
        kind: 'full',
        src: '/assets/manantial-bottle.jpg',
        alt: {
          es: 'Detalle de la botella de Manantial con el trazo de agua',
          en: 'Close-up of the Manantial bottle with its water stroke',
        },
      },
      {
        kind: 'text',
        copy: [
          {
            es: 'El resultado es un sistema que respira: una línea de agua que recorre el empaque, la comunicación y las piezas digitales, y que le da a la marca un gesto reconocible incluso sin el logo.',
            en: 'The result is a system that breathes: a water line running across pack, communication and digital pieces, giving the brand a gesture you recognise even without the logo.',
          },
        ],
      },
      {
        kind: 'duo',
        items: [
          {
            src: '/assets/manantial-people.jpg',
            alt: {
              es: 'Universo fotográfico de la marca Manantial',
              en: 'Photographic universe of the Manantial brand',
            },
          },
          {
            src: '/assets/manantial-app.jpg',
            alt: {
              es: 'Piezas digitales de Manantial en pantallas de móvil',
              en: 'Manantial digital pieces on mobile screens',
            },
          },
        ],
      },
      {
        kind: 'full',
        src: '/assets/manantial-system.jpg',
        alt: {
          es: 'Sistema gráfico de Manantial: empaque, texturas de agua y piezas de campaña',
          en: 'Manantial graphic system: pack, water textures and campaign pieces',
        },
      },
    ],
  },

  /* ─────────────────────────────────── Kumis ───────────────────────────── */
  {
    slug: 'kumis',
    featured: true,
    year: 2025,
    client: { es: 'Kumis', en: 'Kumis' },
    shortTitle: { es: 'Kumis', en: 'Kumis' },
    tagline: { es: 'EQUILIBRIO\nEN LO SIMPLE', en: 'EQUILIBRIUM\nIN THE SIMPLE' },
    sector: { es: 'Drinks & Foods', en: 'Drinks & Foods' },
    categories: ['marca', 'empaque'],
    cover: '/assets/kumis-hero.jpg',
    coverAlt: {
      es: 'Campaña de Kumis: equilibrio y armonía de sabores',
      en: 'Kumis campaign: balance and harmony of flavours',
    },
    intro: [
      {
        es: 'Kumis es leche cultivada, una categoría donde toda la góndola se parece. La marca se construyó para leerse distinta desde lejos: azul, dibujada a mano y con una promesa simple de equilibrio.',
        en: 'Kumis is cultured milk, a category where the whole shelf looks alike. The brand was built to read differently from a distance: blue, hand-drawn and with a simple promise of balance.',
      },
    ],
    blocks: [
      {
        kind: 'full',
        src: '/assets/kumis-billboard.jpg',
        alt: {
          es: 'Valla horizontal de Kumis con el sistema gráfico dibujado a mano',
          en: 'Horizontal Kumis billboard showing the hand-drawn graphic system',
        },
      },
      {
        kind: 'text',
        copy: [
          {
            es: 'Todo el sistema está dibujado a mano: la vaca, el molino, las hojas, los porcentajes. Es un lenguaje que puede crecer sabor a sabor sin volverse ruidoso, y que sostiene la marca desde la etiqueta hasta la valla.',
            en: 'The whole system is hand-drawn: the cow, the windmill, the leaves, the percentages. It is a language that can grow flavour by flavour without getting noisy, and it holds the brand from the label to the billboard.',
          },
        ],
      },
      {
        kind: 'duo',
        items: [
          {
            src: '/assets/kumis-4pack.jpg',
            alt: { es: 'Empaque del 4 Pack de Kumis', en: 'Kumis 4 Pack packaging' },
          },
          {
            src: '/assets/kumis-range.jpg',
            alt: {
              es: 'Presentaciones de Kumis: familiar, personal y Kids',
              en: 'Kumis range: family, personal and Kids formats',
            },
          },
        ],
      },
      {
        kind: 'full',
        src: '/assets/kumis-flavors.jpg',
        alt: {
          es: 'Línea de sabores de Kumis: natural, fresa, chocolate y durazno',
          en: 'Kumis flavour line: natural, strawberry, chocolate and peach',
        },
      },
      {
        kind: 'duo',
        items: [
          {
            src: '/assets/kumis-peach.jpg',
            alt: { es: 'Kumis sabor durazno', en: 'Peach-flavoured Kumis' },
          },
          {
            src: '/assets/kumis-posters.jpg',
            alt: {
              es: 'Piezas de campaña de Kumis en mobiliario urbano',
              en: 'Kumis campaign posters on street furniture',
            },
          },
        ],
      },
      {
        kind: 'text',
        copy: [
          {
            es: 'En el punto de venta la marca se ordena por color: cada sabor tiene su tapa y su franja, y la familia se lee completa aunque el comprador solo alcance a ver la nevera de lejos.',
            en: 'At the point of sale the brand is ordered by colour: every flavour has its cap and its band, so the family reads as one even when the shopper only catches the fridge from a distance.',
          },
        ],
      },
      {
        kind: 'duo',
        items: [
          {
            src: '/assets/kumis-ooh.jpg',
            alt: {
              es: 'Valla de Kumis: equilibrium in the simplest way',
              en: 'Kumis billboard: equilibrium in the simplest way',
            },
          },
          {
            src: '/assets/kumis-retail.jpg',
            alt: {
              es: 'Exhibidor y nevera de marca Kumis en punto de venta',
              en: 'Kumis branded display and fridge at the point of sale',
            },
          },
        ],
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
    blocks: [
      {
        kind: 'full',
        src: '/assets/club-detail.jpg',
        alt: {
          es: 'Detalle de la etiqueta y la tapa de Club Premium Clásica',
          en: 'Close-up of the Club Premium Clásica label and cap',
        },
      },
      {
        kind: 'full',
        src: '/assets/club-bottles.jpg',
        alt: {
          es: 'Botellas de Club Premium Clásica',
          en: 'Club Premium Clásica bottles',
        },
      },
    ],
  },

  /*
    BSC Brewing and Goo used to sit here. Their covers were screenshots of the
    site's own carousel — yellow arrow and all — so they are out until there is
    real artwork for them.
  */

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
