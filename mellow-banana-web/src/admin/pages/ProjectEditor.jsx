import { useNavigate, useParams } from 'react-router-dom'
import { useEditable } from '../useEditable'
import { deleteProject, loadIndustries, loadProjects, renameProject, saveProject } from '../db'
import { CATEGORIES } from '../../data/projects'
import {
  BiInput,
  Button,
  Card,
  Checkbox,
  ListEditor,
  MediaInput,
  PageHeader,
  Select,
  TextInput,
} from '../ui'

const CATEGORY_LABELS = { marca: 'Marca', estrategia: 'Estrategia', empaque: 'Empaque' }

/** The case-study layouts <CaseBlock> knows how to draw. */
const BLOCK_KINDS = [
  { value: 'text', label: 'Texto (párrafos)', images: 0 },
  { value: 'full', label: 'Imagen a todo el ancho', images: 1 },
  { value: 'duo', label: 'Dos imágenes iguales', images: 2 },
  { value: 'split', label: 'Dos imágenes 66 / 33', images: 2 },
  { value: 'trio', label: 'Tres imágenes', images: 3 },
]

const blankImage = () => ({ src: '', alt: { es: '', en: '' } })

function blankBlock(kind) {
  if (kind === 'text') return { kind, copy: [{ es: '', en: '' }] }
  if (kind === 'full') return { kind, ...blankImage() }
  const n = BLOCK_KINDS.find((k) => k.value === kind).images
  return { kind, items: Array.from({ length: n }, blankImage) }
}

const blankProject = () => ({
  slug: '',
  published: false,
  featured: false,
  year: new Date().getFullYear(),
  industry: '',
  categories: [],
  client: { es: '', en: '' },
  shortTitle: { es: '', en: '' },
  tagline: { es: '', en: '' },
  sector: { es: '', en: '' },
  cover: '',
  coverAlt: { es: '', en: '' },
  intro: [{ es: '', en: '' }],
  blocks: [],
})

function ImageFields({ value, onChange }) {
  return (
    <div className="space-y-3">
      <MediaInput
        label="Imagen"
        folder="projects"
        value={value.src}
        onChange={(src) => onChange({ ...value, src })}
      />
      <BiInput
        label="Texto alternativo"
        hint="Describe la imagen para lectores de pantalla y buscadores."
        value={value.alt}
        onChange={(alt) => onChange({ ...value, alt })}
      />
    </div>
  )
}

function BlockFields({ block, onChange }) {
  const changeKind = (kind) => {
    if (kind === block.kind) return
    if (window.confirm('Cambiar el tipo de bloque borra su contenido. ¿Continuar?')) onChange(blankBlock(kind))
  }

  return (
    <div className="space-y-4">
      <Select label="Tipo de bloque" value={block.kind} onChange={changeKind} options={BLOCK_KINDS} />

      {block.kind === 'text' ? (
        <ListEditor
          items={block.copy}
          onChange={(copy) => onChange({ ...block, copy })}
          create={() => ({ es: '', en: '' })}
          addLabel="Agregar párrafo"
          itemLabel={(_, i) => `Párrafo ${i + 1}`}
          render={(para, set) => <BiInput label="Texto" multiline rows={4} value={para} onChange={set} />}
        />
      ) : null}

      {block.kind === 'full' ? (
        <>
          <ImageFields value={block} onChange={(v) => onChange({ ...block, ...v })} />
          <Checkbox
            label="Mostrar completa, sin recortar"
            checked={block.contain}
            onChange={(contain) => onChange({ ...block, contain })}
          />
        </>
      ) : null}

      {['duo', 'split', 'trio'].includes(block.kind) ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {block.items.map((item, i) => (
            <div key={i} className="rounded-md border border-neutral-200 p-3">
              <p className="mb-2 text-xs font-semibold text-neutral-500">Imagen {i + 1}</p>
              <ImageFields
                value={item}
                onChange={(next) =>
                  onChange({ ...block, items: block.items.map((it, j) => (j === i ? next : it)) })
                }
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default function ProjectEditor() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isNew = slug === 'new'

  const { data, update, dirty, saving, status, save, loadError } = useEditable(
    async () => {
      const [projects, industries] = await Promise.all([loadProjects(), loadIndustries()])
      const index = projects.findIndex((p) => p.slug === slug)
      if (!isNew && index < 0) throw new Error(`No existe el proyecto “${slug}”.`)
      return {
        project: isNew ? blankProject() : projects[index],
        position: isNew ? projects.length : index,
        taken: projects.map((p) => p.slug).filter((s) => s !== slug),
        industries,
      }
    },
    async ({ project, position, taken }) => {
      if (!/^[a-z0-9-]+$/.test(project.slug))
        throw new Error('el identificador solo admite minúsculas, números y guiones.')
      if (taken.includes(project.slug)) throw new Error('ya hay otro proyecto con ese identificador.')
      if (isNew || project.slug === slug) await saveProject(project, position)
      else await renameProject(slug, project, position)
      if (project.slug !== slug) navigate(`/admin/projects/${project.slug}`, { replace: true })
    },
  )

  if (loadError) return <p className="pt-6 text-sm text-red-600">{loadError}</p>
  if (!data) return <p className="pt-6 text-sm text-neutral-500">Cargando…</p>

  const p = data.project
  const set = (field) => (value) => update((d) => ({ ...d, project: { ...d.project, [field]: value } }))

  const remove = async () => {
    if (!window.confirm(`¿Eliminar “${p.shortTitle?.es || slug}”? No se puede deshacer.`)) return
    await deleteProject(slug)
    navigate('/admin/projects')
  }

  return (
    <>
      <PageHeader
        title={isNew ? 'Nuevo proyecto' : p.shortTitle?.es || slug}
        description={isNew ? 'Se guarda como borrador hasta que marques “Publicado”.' : `/work/${slug}`}
        onSave={save}
        saving={saving}
        status={status}
        dirty={dirty}
        actions={
          <>
            <Button variant="secondary" onClick={() => navigate('/admin/projects')}>
              ← Volver
            </Button>
            {!isNew ? (
              <Button variant="danger" onClick={remove}>
                Eliminar
              </Button>
            ) : null}
          </>
        }
      />

      <div className="space-y-6">
        <Card title="General">
          <div className="grid gap-4 md:grid-cols-3">
            <TextInput
              label="Identificador (URL)"
              hint="ej. federacion-colombiana"
              value={p.slug}
              onChange={(v) => set('slug')(v.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
            />
            <TextInput label="Año" type="number" value={p.year ?? ''} onChange={set('year')} />
            <Select
              label="Sector (filtro de Proyectos)"
              value={p.industry ?? ''}
              onChange={set('industry')}
              options={[
                { value: '', label: '— Sin sector —' },
                ...data.industries.map((i) => ({ value: i.key, label: i.label?.es || i.key })),
              ]}
            />
          </div>
          <div className="flex flex-wrap gap-6">
            <Checkbox label="Publicado" checked={p.published !== false} onChange={set('published')} />
            <Checkbox label="Destacado en el inicio" checked={p.featured} onChange={set('featured')} />
          </div>
          <fieldset>
            <legend className="mb-1.5 text-xs font-medium tracking-wide text-neutral-600 uppercase">
              Categorías (filtros del carrusel del inicio)
            </legend>
            <div className="flex flex-wrap gap-6">
              {CATEGORIES.map((cat) => (
                <Checkbox
                  key={cat}
                  label={CATEGORY_LABELS[cat] ?? cat}
                  checked={p.categories.includes(cat)}
                  onChange={(on) =>
                    set('categories')(on ? [...p.categories, cat] : p.categories.filter((c) => c !== cat))
                  }
                />
              ))}
            </div>
          </fieldset>
        </Card>

        <Card title="Textos">
          <BiInput label="Nombre corto (tarjetas)" value={p.shortTitle} onChange={set('shortTitle')} />
          <BiInput
            label="Cliente (título del caso)"
            hint="Puedes partirlo en líneas con Enter."
            multiline
            rows={2}
            value={p.client}
            onChange={set('client')}
          />
          <BiInput label="Etiqueta de sector (tarjetas)" hint="ej. Deporte" value={p.sector} onChange={set('sector')} />
          <BiInput label="Frase principal" multiline rows={2} value={p.tagline} onChange={set('tagline')} />
          <div>
            <p className="mb-2 text-xs font-medium tracking-wide text-neutral-600 uppercase">Introducción</p>
            <ListEditor
              items={p.intro}
              onChange={set('intro')}
              create={() => ({ es: '', en: '' })}
              addLabel="Agregar párrafo"
              itemLabel={(_, i) => `Párrafo ${i + 1}`}
              render={(para, setPara) => (
                <BiInput label="Texto" multiline rows={4} value={para} onChange={setPara} />
              )}
            />
          </div>
        </Card>

        <Card title="Portada">
          <MediaInput label="Imagen de portada" folder="projects" value={p.cover} onChange={set('cover')} />
          <BiInput label="Texto alternativo" value={p.coverAlt} onChange={set('coverAlt')} />
        </Card>

        <Card
          title="Caso de estudio"
          description="Bloques en el orden en que aparecen en la página. Sin bloques se muestra la portada con “Caso de estudio completo próximamente”."
        >
          <ListEditor
            items={p.blocks}
            onChange={set('blocks')}
            create={() => blankBlock('full')}
            addLabel="Agregar bloque"
            itemLabel={(b, i) => `Bloque ${i + 1} · ${BLOCK_KINDS.find((k) => k.value === b.kind)?.label ?? b.kind}`}
            render={(block, setBlock) => <BlockFields block={block} onChange={setBlock} />}
          />
        </Card>
      </div>
    </>
  )
}
