import { useEditable } from '../useEditable'
import {
  loadClients,
  loadIndustries,
  loadPillars,
  loadServices,
  saveClients,
  saveIndustries,
  savePillars,
  saveServices,
} from '../db'
import { BiInput, ListEditor, MediaInput, PageHeader, TextInput } from '../ui'

const toKey = (v) => v.toLowerCase().replace(/[^a-z0-9-]/g, '-')

/** Shared screen for the ordered lists: one header, one list editor. */
function CollectionPage({ title, description, load, save, ...list }) {
  const { data, update, dirty, saving, status, save: commit, loadError } = useEditable(load, async (items) => {
    const keys = items.map((i) => i.key).filter((k) => k !== undefined)
    if (keys.some((k) => !k)) throw new Error('todos los elementos necesitan un identificador.')
    if (new Set(keys).size !== keys.length) throw new Error('hay identificadores repetidos.')
    await save(items)
  })

  if (loadError) return <p className="text-sm text-red-600">{loadError}</p>
  if (!data) return <p className="text-sm text-neutral-500">Cargando…</p>

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        onSave={commit}
        saving={saving}
        status={status}
        dirty={dirty}
      />
      <ListEditor items={data} onChange={update} {...list} />
    </>
  )
}

export function ServicesPage() {
  return (
    <CollectionPage
      title="Servicios"
      description="Las filas desplegables de la página Servicios (01, 02, 03…). El número sale del orden."
      load={loadServices}
      save={saveServices}
      addLabel="Agregar servicio"
      itemLabel={(s, i) => `${String(i + 1).padStart(2, '0')} · ${s.title?.es || 'Nuevo servicio'}`}
      create={() => ({ key: '', title: { es: '', en: '' }, lead: { es: '', en: '' }, items: [] })}
      render={(s, set) => (
        <div className="space-y-4">
          <TextInput label="Identificador" hint="Interno, ej. strategy" value={s.key} onChange={(v) => set({ ...s, key: toKey(v) })} />
          <BiInput label="Título" value={s.title} onChange={(title) => set({ ...s, title })} />
          <BiInput label="Frase" multiline rows={2} value={s.lead} onChange={(lead) => set({ ...s, lead })} />
          <div>
            <p className="mb-2 text-xs font-medium tracking-wide text-neutral-600 uppercase">Entregables</p>
            <ListEditor
              items={s.items}
              onChange={(items) => set({ ...s, items })}
              create={() => ({ es: '', en: '' })}
              addLabel="Agregar entregable"
              render={(item, setItem) => <BiInput label="Entregable" value={item} onChange={setItem} />}
            />
          </div>
        </div>
      )}
    />
  )
}

export function PillarsPage() {
  return (
    <CollectionPage
      title="Cómo lo hacemos"
      description="Las etapas del proceso en Nosotros, cada una con sus imágenes (idealmente 3, en formato 4:3)."
      load={loadPillars}
      save={savePillars}
      addLabel="Agregar etapa"
      itemLabel={(p) => p.title?.es || 'Nueva etapa'}
      create={() => ({ key: '', title: { es: '', en: '' }, body: { es: '', en: '' }, images: ['', '', ''] })}
      render={(p, set) => (
        <div className="space-y-4">
          <TextInput label="Identificador" hint="Interno, ej. landscape" value={p.key} onChange={(v) => set({ ...p, key: toKey(v) })} />
          <BiInput label="Título" value={p.title} onChange={(title) => set({ ...p, title })} />
          <BiInput label="Descripción" multiline rows={3} value={p.body} onChange={(body) => set({ ...p, body })} />
          <ListEditor
            items={p.images}
            onChange={(images) => set({ ...p, images })}
            create={() => ''}
            addLabel="Agregar imagen"
            itemLabel={(_, i) => `Imagen ${i + 1}`}
            render={(src, setSrc) => <MediaInput label="Imagen" folder="about" value={src} onChange={setSrc} />}
          />
        </div>
      )}
    />
  )
}

export function ClientsPage() {
  return (
    <CollectionPage
      title="Clientes"
      description="El muro de logos del inicio. Usa PNG con fondo transparente y logo en negro: el sitio lo adapta a fondos claros y oscuros."
      load={loadClients}
      save={saveClients}
      addLabel="Agregar cliente"
      itemLabel={(c) => c.name || 'Nuevo cliente'}
      create={() => ({ name: '', logo: '' })}
      render={(c, set) => (
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput label="Nombre" value={c.name} onChange={(name) => set({ ...c, name })} />
          <MediaInput label="Logo" folder="clients" accept="image/png,image/svg+xml,image/webp" value={c.logo} onChange={(logo) => set({ ...c, logo })} />
        </div>
      )}
    />
  )
}

export function IndustriesPage() {
  return (
    <CollectionPage
      title="Sectores"
      description="Los filtros de la página Proyectos. Cada proyecto elige su sector en su ficha."
      load={loadIndustries}
      save={saveIndustries}
      addLabel="Agregar sector"
      itemLabel={(s) => s.label?.es || 'Nuevo sector'}
      create={() => ({ key: '', label: { es: '', en: '' } })}
      render={(s, set) => (
        <div className="grid gap-4 md:grid-cols-[14rem_1fr]">
          <TextInput label="Identificador" hint="Interno, ej. food" value={s.key} onChange={(v) => set({ ...s, key: toKey(v) })} />
          <BiInput label="Nombre" value={s.label} onChange={(label) => set({ ...s, label })} />
        </div>
      )}
    />
  )
}
