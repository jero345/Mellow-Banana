import { useMemo, useState } from 'react'
import { useEditable } from '../useEditable'
import { loadTranslations, saveTranslations } from '../db'
import { PageHeader } from '../ui'

/** Readable names for the key prefixes. */
const GROUPS = {
  nav: 'Menú',
  home: 'Inicio',
  cta: 'Llamados a la acción',
  footer: 'Footer',
  work: 'Proyectos',
  project: 'Página de proyecto',
  about: 'Nosotros',
  services: 'Servicios',
  contact: 'Contacto',
  form: 'Formulario de contacto',
  legal: 'Páginas legales',
  nf: 'Página no encontrada',
  reel: 'Reel',
}

const field =
  'w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900'

export default function TextsPage() {
  const { data, update, dirty, saving, status, save, loadError } = useEditable(
    loadTranslations,
    saveTranslations,
  )
  const [query, setQuery] = useState('')

  const groups = useMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    const out = new Map()
    for (const key of Object.keys(data.es).sort()) {
      const hit =
        !q ||
        key.includes(q) ||
        data.es[key].toLowerCase().includes(q) ||
        data.en[key].toLowerCase().includes(q)
      if (!hit) continue
      const group = key.split('.')[0]
      if (!out.has(group)) out.set(group, [])
      out.get(group).push(key)
    }
    return [...out]
  }, [data, query])

  if (loadError) return <p className="text-sm text-red-600">{loadError}</p>
  if (!data) return <p className="text-sm text-neutral-500">Cargando…</p>

  const set = (lang, key, value) => update((d) => ({ ...d, [lang]: { ...d[lang], [key]: value } }))

  return (
    <>
      <PageHeader
        title="Textos del sitio"
        description="Toda la copia de la interfaz en español e inglés. Un salto de línea aquí es un salto de línea en el sitio."
        onSave={save}
        saving={saving}
        status={status}
        dirty={dirty}
      />

      <input
        type="search"
        placeholder="Buscar un texto…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`${field} mb-6 max-w-md`}
      />

      <div className="space-y-8">
        {groups.map(([group, keys]) => (
          <section key={group}>
            <h2 className="mb-3 text-sm font-semibold text-neutral-900">{GROUPS[group] ?? group}</h2>
            <div className="divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200 bg-white">
              {keys.map((key) => {
                const long = Math.max(data.es[key].length, data.en[key].length) > 60
                const rows = long ? 4 : Math.max(1, data.es[key].split('\n').length)
                return (
                  <div key={key} className="grid gap-3 p-4 lg:grid-cols-[12rem_1fr_1fr]">
                    <code className="pt-2 text-xs break-all text-neutral-500">{key}</code>
                    {['es', 'en'].map((lang) => (
                      <label key={lang} className="relative block">
                        <span className="pointer-events-none absolute top-2 right-2 text-[10px] font-semibold text-neutral-400 uppercase">
                          {lang}
                        </span>
                        <textarea
                          className={`${field} resize-y pr-8`}
                          rows={rows}
                          value={data[lang][key]}
                          onChange={(e) => set(lang, key, e.target.value)}
                          aria-label={`${key} (${lang})`}
                        />
                      </label>
                    ))}
                  </div>
                )
              })}
            </div>
          </section>
        ))}
        {!groups.length ? <p className="text-sm text-neutral-500">Ningún texto coincide.</p> : null}
      </div>
    </>
  )
}
