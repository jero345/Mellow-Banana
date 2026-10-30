/**
 * Single source of truth for contact details, nav, services and clients.
 * All strings that differ per language live in src/i18n/dictionary.js.
 */

export const contact = {
  address: 'Carrera 13 No. 96-67  Oficina. 313',
  city: 'Bogotá, Colombia',
  phone: '+57 324 261 6184',
  phoneHref: '+573242616184',
  whatsapp: 'https://wa.me/573242616184',
  email: 'hola@mbanana.co',
  jobsEmail: 'Empleo@mbanana.co',
  infoEmail: 'Info@mbanana.co',
}

export const socials = [
  { label: 'Behance', href: 'https://www.behance.net/mellowbanana' },
  { label: 'Instagram', href: 'https://www.instagram.com/mellowandbanana/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mellow-banana/' },
]

export const nav = [
  { key: 'work', to: '/work' },
  { key: 'about', to: '/about' },
  { key: 'services', to: '/services' },
  { key: 'contact', to: '/contact' },
]

/** "Nuevos proyectos" contacts in the footer. */
export const newBusiness = ['victor@mmbanana.co', 'carlos@mmbanana.co']

/** Capability tags on the Services artboard, in its reading order. */
export const capabilities = [
  'Brand Strategy',
  'Brand Identity',
  'Naming',
  'Packaging',
  'Editorial',
  'Brand Experience',
  'Motion Graphics',
  'Campaigns',
  'Ilustration',
]

/**
 * The three services on the Services page. Each one opens to a lead and the
 * list of deliverables; the copy lives in the dictionary under `service.<key>`.
 */
export const services = [
  { key: 'strategy', items: 6 },
  { key: 'design', items: 6 },
  { key: 'experience', items: 5 },
]

/**
 * "Cómo lo hacemos" — the four steps of the process on the About artboard,
 * each illustrated with three slides from real projects.
 */
export const pillars = ['landscape', 'strategy', 'design', 'guidelines'].map((key) => ({
  key,
  images: [1, 2, 3].map((n) => `/assets/how-${key}-${n}.jpg`),
}))

/** "La vida en Mellow" — the studio photo strip on the About artboard. */
export const studioLife = [1, 2, 3, 4, 5].map((n) => `/assets/life-${n}.jpg`)

/**
 * Client roster — 33 individual marks in `public/clients`, normalised to flat
 * black on a transparent ground inside an identical box. That means one CSS
 * `invert` themes the whole wall for dark sections and every logo carries the
 * same optical weight, whatever its shape.
 *
 * Order matters: it is the reading order of the wall, and <ClientWall /> deals
 * it into rows, so the best-known names stay spread across all of them.
 */
export const clients = [
  { slug: 'abinbev', name: 'ABInBev' },
  { slug: 'netflix', name: 'Netflix' },
  { slug: 'alpina', name: 'Alpina' },
  { slug: 'jb', name: 'J&B' },
  { slug: 'crepes-waffles', name: 'Crepes & Waffles' },
  { slug: 'grupo-bolivar', name: 'Grupo Bolívar' },
  { slug: 'grupo-bimbo', name: 'Grupo Bimbo' },
  { slug: 'marsh', name: 'Marsh' },
  { slug: 'fcf', name: 'Federación Colombiana de Fútbol' },
  { slug: 'gws', name: 'Global Wine & Spirits' },
  { slug: 'club-premium', name: 'Cerveza Club Premium' },
  { slug: 'manantial', name: 'Manantial' },
  { slug: 'caracol', name: 'Caracol Televisión' },
  { slug: 'bbc', name: 'Bogotá Beer Company' },
  { slug: 'mercedes-benz', name: 'Mercedes-Benz' },
  { slug: 'compass-group', name: 'Compass Group' },
  { slug: 'grupo-smile', name: 'Grupo Smile' },
  { slug: 'elemento-4k', name: 'Elemento 4k' },
  { slug: 'diners-club', name: 'Diners Club International' },
  { slug: 'home-burgers', name: 'Home Burgers & Shakes' },
  { slug: 'la-insuperable', name: 'La Insuperable' },
  { slug: 'la-nieve', name: 'La Nieve' },
  { slug: 'saju', name: 'Sajú' },
  { slug: 'hanna-hops', name: 'Hanna Hops Brewery' },
  { slug: 'magic-13', name: 'Magic 13 Brewing Co.' },
  { slug: 'bogota-eats', name: 'Bogotá Eats' },
  { slug: 'agua-siembra', name: 'Agua Siembra' },
  { slug: 'molt', name: 'Molt' },
  { slug: 'macha', name: 'Macha' },
  { slug: 'cicl-co', name: 'Cícl-co' },
  { slug: 'cerveceria-del-pueblo', name: 'Cervecería del Pueblo' },
  { slug: 'latu', name: 'Latú Seguros' },
  { slug: 'gooms', name: 'Gooms' },
]
