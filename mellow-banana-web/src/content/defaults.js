/**
 * The content the site ships with, in the same shape the CMS serves.
 *
 * It is the first paint (the site never waits on the network to render) and
 * the fallback when Supabase is not configured or unreachable. It is also what
 * `scripts/seed.mjs` loads into a fresh Supabase project.
 */
import { dictionary } from '../i18n/dictionary'
import { INDUSTRIES, projects } from '../data/projects'
import { capabilities, clients, contact, newBusiness, pillars, services, socials, studioLife } from '../data/site'

const pair = (key) => ({ es: dictionary.es[key] ?? '', en: dictionary.en[key] ?? '' })

export const defaults = {
  settings: {
    contact,
    socials,
    newBusiness,
    capabilities,
    studioLife,
    media: {
      poster: '/media/reel-poster.jpg',
      heroLoop1080: '/media/hero-loop-1080.mp4',
      heroLoop720: '/media/hero-loop-720.mp4',
      reel: '/media/reel.mp4',
    },
  },

  translations: dictionary,

  projects: projects.map((p) => ({ published: true, featured: false, ...p })),

  clients: clients.map((c) => ({ name: c.name, logo: `/clients/${c.slug}.png` })),

  industries: INDUSTRIES.map((key) => ({ key, label: pair(`work.industry.${key}`) })),

  services: services.map((s) => ({
    key: s.key,
    title: pair(`service.${s.key}.title`),
    lead: pair(`service.${s.key}.lead`),
    items: Array.from({ length: s.items }, (_, i) => pair(`service.${s.key}.${i + 1}`)),
  })),

  pillars: pillars.map((p) => ({
    key: p.key,
    title: pair(`pillar.${p.key}.title`),
    body: pair(`pillar.${p.key}.body`),
    images: p.images,
  })),
}
