const URL_ = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

/** Whether a Supabase project is configured for this build. */
export const cmsEnabled = Boolean(URL_ && KEY)

/*
  Rows ↔ app shape. The database uses snake_case and stores the dictionary as
  one row per key; the components expect the shapes in ./defaults.js.
*/

export const projectFromRow = (r) => ({
  slug: r.slug,
  published: r.published,
  featured: r.featured,
  year: r.year,
  industry: r.industry,
  categories: r.categories ?? [],
  client: r.client,
  shortTitle: r.short_title,
  tagline: r.tagline,
  sector: r.sector,
  cover: r.cover,
  coverAlt: r.cover_alt,
  intro: r.intro ?? [],
  blocks: r.blocks ?? [],
})

export const projectToRow = (p, position) => ({
  slug: p.slug,
  position,
  published: p.published ?? true,
  featured: p.featured ?? false,
  year: p.year ? Number(p.year) : null,
  industry: p.industry || null,
  categories: p.categories ?? [],
  client: p.client ?? {},
  short_title: p.shortTitle ?? {},
  tagline: p.tagline ?? {},
  sector: p.sector ?? {},
  cover: p.cover || null,
  cover_alt: p.coverAlt ?? {},
  intro: p.intro ?? [],
  blocks: p.blocks ?? [],
})

export const translationsFromRows = (rows) => {
  const out = { es: {}, en: {} }
  for (const r of rows) {
    out.es[r.key] = r.es
    out.en[r.key] = r.en
  }
  return out
}

export const translationsToRows = (dict) =>
  Object.keys(dict.es).map((key) => ({ key, es: dict.es[key] ?? '', en: dict.en[key] ?? '' }))

/*
  The public site reads through plain REST calls rather than supabase-js: it
  only ever needs anonymous SELECTs, and the full client (auth, storage,
  realtime) would add ~55 KB gzip to every visitor's first load. The admin,
  which does need it, loads it in its own chunk.
*/
async function rest(path) {
  const res = await fetch(`${URL_}/rest/v1/${path}`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  return res.json()
}

const ordered = (table) => rest(`${table}?select=*&order=position`)

/**
 * Everything the public site needs, in one round of parallel requests.
 * Tables that come back empty are left out, so the caller keeps its bundled
 * content for them instead of rendering a blank section.
 */
export async function fetchContent() {
  if (!cmsEnabled) return null

  const [settings, translations, projects, clients, industries, services, pillars] =
    await Promise.all([
      rest('settings?select=data&id=eq.1'),
      rest('translations?select=key,es,en'),
      ordered('projects'),
      ordered('clients'),
      ordered('industries'),
      ordered('services'),
      ordered('pillars'),
    ])

  const out = {}
  const data = settings[0]?.data
  if (data && Object.keys(data).length) out.settings = data
  if (translations.length) out.translations = translationsFromRows(translations)
  if (projects.length) out.projects = projects.map(projectFromRow)
  if (clients.length) out.clients = clients.map(({ name, logo }) => ({ name, logo }))
  if (industries.length) out.industries = industries.map(({ key, label }) => ({ key, label }))
  if (services.length)
    out.services = services.map(({ key, title, lead, items }) => ({ key, title, lead, items }))
  if (pillars.length)
    out.pillars = pillars.map(({ key, title, body, images }) => ({ key, title, body, images }))
  return out
}
