import { MEDIA_BUCKET, supabase } from '../lib/supabase'
import {
  projectFromRow,
  projectToRow,
  translationsFromRows,
  translationsToRows,
} from '../content/api'
import { defaults } from '../content/defaults'

/*
  Admin reads and writes. Unlike the public site, these go straight to the
  database with no fallback: what you see is exactly what is stored.
*/

const check = ({ data, error }) => {
  if (error) throw error
  return data
}

/**
 * Dictionary keys whose content is edited in its own section (services,
 * pillars, sectors). They stay out of "Textos" so nothing is edited twice.
 */
export const CONTENT_KEY_PREFIXES = ['service.', 'pillar.', 'work.industry.']
const isUiKey = (key) => !CONTENT_KEY_PREFIXES.some((p) => key.startsWith(p))

/**
 * Saves an ordered collection: upserts every item with its position, then
 * deletes whatever is no longer in the list.
 */
async function saveCollection(table, pk, items) {
  const rows = items.map((item, position) => ({ ...item, position }))
  const saved = rows.length
    ? check(await supabase.from(table).upsert(rows, { defaultToNull: false }).select(pk))
    : []
  const keep = saved.map((r) => r[pk])
  const del = supabase.from(table).delete()
  check(
    await (keep.length
      ? del.not(pk, 'in', `(${keep.map((k) => JSON.stringify(k)).join(',')})`)
      : del.not(pk, 'is', null)),
  )
}

/* ── settings ── */

export const loadSettings = async () =>
  check(await supabase.from('settings').select('data').eq('id', 1).maybeSingle())?.data ?? {}

export const saveSettings = async (data) =>
  check(await supabase.from('settings').upsert({ id: 1, data, updated_at: new Date().toISOString() }))

/* ── translations ── */

/** Every UI key the code knows, with the stored copy over the bundled one. */
export async function loadTranslations() {
  const rows = check(await supabase.from('translations').select('key, es, en'))
  const stored = translationsFromRows(rows)
  const out = { es: {}, en: {} }
  const keys = new Set([...Object.keys(defaults.translations.es), ...Object.keys(stored.es)])
  for (const key of [...keys].filter(isUiKey)) {
    out.es[key] = stored.es[key] ?? defaults.translations.es[key] ?? ''
    out.en[key] = stored.en[key] ?? defaults.translations.en[key] ?? ''
  }
  return out
}

export async function saveTranslations(dict) {
  const rows = translationsToRows(dict).map((r) => ({ ...r, updated_at: new Date().toISOString() }))
  check(await supabase.from('translations').upsert(rows))
}

/* ── projects ── */

export async function loadProjects() {
  return check(await supabase.from('projects').select('*').order('position')).map(projectFromRow)
}

export async function saveProject(project, position) {
  check(
    await supabase
      .from('projects')
      .upsert({ ...projectToRow(project, position), updated_at: new Date().toISOString() }),
  )
}

/** Renaming a slug is a new primary key: write the new row, then drop the old one. */
export async function renameProject(oldSlug, project, position) {
  await saveProject(project, position)
  check(await supabase.from('projects').delete().eq('slug', oldSlug))
}

export const deleteProject = async (slug) =>
  check(await supabase.from('projects').delete().eq('slug', slug))

export async function saveProjectOrder(projects) {
  check(
    await supabase
      .from('projects')
      .upsert(projects.map((p, i) => projectToRow(p, i))),
  )
}

/* ── simple collections ── */

const strip = (fields) => (rows) => rows.map((r) => Object.fromEntries(fields.map((f) => [f, r[f]])))

export const loadClients = async () =>
  strip(['id', 'name', 'logo'])(check(await supabase.from('clients').select('*').order('position')))
export const saveClients = (items) =>
  saveCollection(
    'clients',
    'id',
    // New rows have no id yet; leaving it out lets the identity column assign one.
    items.map(({ id, ...rest }) => (id ? { id, ...rest } : rest)),
  )

export const loadIndustries = async () =>
  strip(['key', 'label'])(check(await supabase.from('industries').select('*').order('position')))
export const saveIndustries = (items) => saveCollection('industries', 'key', items)

export const loadServices = async () =>
  strip(['key', 'title', 'lead', 'items'])(
    check(await supabase.from('services').select('*').order('position')),
  )
export const saveServices = (items) => saveCollection('services', 'key', items)

export const loadPillars = async () =>
  strip(['key', 'title', 'body', 'images'])(
    check(await supabase.from('pillars').select('*').order('position')),
  )
export const savePillars = (items) => saveCollection('pillars', 'key', items)

/* ── first-run import ── */

/** True when the database has no content yet. */
export async function isEmpty() {
  const { count, error } = await supabase.from('projects').select('slug', { count: 'exact', head: true })
  if (error) throw error
  const settings = await loadSettings()
  return count === 0 && Object.keys(settings).length === 0
}

/**
 * Loads the content the site ships with into the database, so the client
 * starts editing from today's site instead of a blank one.
 */
export async function importDefaults() {
  await saveSettings(defaults.settings)
  const dict = {
    es: Object.fromEntries(Object.entries(defaults.translations.es).filter(([k]) => isUiKey(k))),
    en: Object.fromEntries(Object.entries(defaults.translations.en).filter(([k]) => isUiKey(k))),
  }
  await saveTranslations(dict)
  await saveProjectOrder(defaults.projects)
  await saveClients(defaults.clients)
  await saveIndustries(defaults.industries)
  await saveServices(defaults.services)
  await savePillars(defaults.pillars)
}

/** Uploads a file to the media bucket and returns its public URL. */
export async function uploadMedia(file, folder = 'uploads') {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin'
  const base = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const path = `${folder}/${Date.now()}-${base || 'file'}.${ext}`

  check(
    await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
      cacheControl: '31536000',
      contentType: file.type || undefined,
    }),
  )
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl
}
