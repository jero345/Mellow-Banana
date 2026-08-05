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
  { label: 'Instagram', href: 'https://www.instagram.com/mellowandbanana/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mellow-banana/' },
  { label: 'Behance', href: 'https://www.behance.net/mellowbanana' },
]

export const nav = [
  { key: 'work', to: '/work' },
  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' },
]

/** "Qué hacemos" — capability tags, in the order shown on the About artboard. */
export const capabilities = [
  'Naming',
  'Brand Strategy',
  'Brand Identity',
  'Packaging',
  'Digital Experiences',
  'Motion Graphics',
  'Ilustration',
  'Editorial',
  'Education',
  'Brand Voice',
]

/** Sectors we work in — "Clientes" tag row on the About artboard. */
export const sectors = [
  'Art & Culture',
  'Consumer Brands',
  'Entertainment',
  'Fashion',
  'Fintech',
  'Beauty',
  'Technology',
  'Hospitality & Travel',
  'Health',
  'Real Estate',
  'Education',
  'Sport',
  'Drinks & Foods',
]

/**
 * The four service pillars. Each pillar shows three brand examples;
 * `works` maps to project slugs so the cards stay in sync with the work index.
 */
export const pillars = [
  { key: 'landscape', works: ['fcf', 'manantial', 'club-premium'] },
  { key: 'strategy', works: ['home-burgers', 'jus', 'verano'] },
  { key: 'design', works: ['manantial', 'fcf', 'verano'] },
  { key: 'guidelines', works: ['club-premium', 'jus', 'home-burgers'] },
]

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
