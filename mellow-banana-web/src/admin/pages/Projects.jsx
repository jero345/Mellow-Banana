import { Link, useNavigate } from 'react-router-dom'
import { useEditable } from '../useEditable'
import { loadProjects, saveProjectOrder } from '../db'
import { Button, IconButton, PageHeader } from '../ui'

export default function ProjectsPage() {
  const navigate = useNavigate()
  const { data, update, dirty, saving, status, save, loadError } = useEditable(
    loadProjects,
    saveProjectOrder,
  )

  if (loadError) return <p className="text-sm text-red-600">{loadError}</p>
  if (!data) return <p className="text-sm text-neutral-500">Cargando…</p>

  const move = (i, d) =>
    update((list) => {
      const j = i + d
      if (j < 0 || j >= list.length) return list
      const next = [...list]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })

  const toggle = (i, field) =>
    update((list) => list.map((p, j) => (j === i ? { ...p, [field]: !p[field] } : p)))

  return (
    <>
      <PageHeader
        title="Proyectos"
        description="Ordena con las flechas. “Destacado” lo muestra en el carrusel del inicio."
        onSave={save}
        saving={saving}
        status={status}
        dirty={dirty}
        actions={
          <Button variant="secondary" onClick={() => navigate('/admin/projects/new')}>
            + Nuevo proyecto
          </Button>
        }
      />

      <ul className="divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200 bg-white">
        {data.map((p, i) => (
          <li key={p.slug} className="flex items-center gap-4 p-3">
            <img
              src={p.cover}
              alt=""
              className="h-12 w-18 shrink-0 rounded bg-neutral-100 object-cover"
            />
            <div className="min-w-0 flex-1">
              <Link
                to={`/admin/projects/${p.slug}`}
                className="block truncate text-sm font-medium hover:underline"
              >
                {p.shortTitle?.es || p.slug}
              </Link>
              <p className="text-xs text-neutral-500">/{p.slug}</p>
            </div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-700">
              <input
                type="checkbox"
                className="accent-neutral-900"
                checked={p.published !== false}
                onChange={() => toggle(i, 'published')}
              />
              Publicado
            </label>
            <label className="flex items-center gap-1.5 text-xs text-neutral-700">
              <input
                type="checkbox"
                className="accent-neutral-900"
                checked={!!p.featured}
                onChange={() => toggle(i, 'featured')}
              />
              Destacado
            </label>
            <div className="flex gap-1">
              <IconButton label="Subir" onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </IconButton>
              <IconButton label="Bajar" onClick={() => move(i, 1)} disabled={i === data.length - 1}>
                ↓
              </IconButton>
            </div>
          </li>
        ))}
        {!data.length ? (
          <li className="p-6 text-center text-sm text-neutral-500">Todavía no hay proyectos.</li>
        ) : null}
      </ul>
    </>
  )
}
