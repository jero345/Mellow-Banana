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
 * Client roster. The two halves are the artwork straight from the artboard —
 * each holds two rows of marks; `clientNames` provides the accessible label.
 */
export const clientHalves = ['/assets/clients-left.png', '/assets/clients-right.png']

export const clientNames = [
  'ABInBev',
  'Netflix',
  'Alpina',
  'Cerveza Águila',
  'Cerveza Club Premium',
  'Manantial',
  'Caracol Televisión',
  'BBC',
  'Mercedes-Benz',
  'Grupo Bolívar',
  'Grupo Bimbo',
  'Marsh',
  'GWS',
  'Compass Group',
  'Grupo Smile',
  'Elemento 4k',
  'Hiime',
  'Diners Club International',
]
