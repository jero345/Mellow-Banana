import { useEditable } from '../useEditable'
import { loadSettings, saveSettings } from '../db'
import { defaults } from '../../content/defaults'
import { Card, LinesInput, ListEditor, MediaInput, PageHeader, TextInput } from '../ui'

/** Stored settings over the bundled ones, so every field always has a value to edit. */
async function load() {
  const stored = await loadSettings()
  const base = defaults.settings
  return {
    ...base,
    ...stored,
    contact: { ...base.contact, ...stored.contact },
    media: { ...base.media, ...stored.media },
  }
}

const CONTACT_FIELDS = [
  { key: 'address', label: 'Dirección' },
  { key: 'city', label: 'Ciudad' },
  { key: 'phone', label: 'Teléfono (como se muestra)' },
  { key: 'phoneHref', label: 'Teléfono para llamar', hint: 'Solo números con indicativo, ej. +573242616184' },
  { key: 'whatsapp', label: 'Enlace de WhatsApp', hint: 'ej. https://wa.me/573242616184' },
  { key: 'email', label: 'Correo principal', hint: 'Footer “Trabaja con nosotros” y formulario de contacto.' },
  { key: 'jobsEmail', label: 'Correo de empleos (Contacto)' },
  { key: 'infoEmail', label: 'Correo “Trabaja con nosotros” (Contacto)' },
]

export default function SettingsPage() {
  const { data, update, dirty, saving, status, save, loadError } = useEditable(load, saveSettings)

  if (loadError) return <p className="text-sm text-red-600">{loadError}</p>
  if (!data) return <p className="text-sm text-neutral-500">Cargando…</p>

  const set = (field) => (value) => update((d) => ({ ...d, [field]: value }))
  const setIn = (group, field) => (value) =>
    update((d) => ({ ...d, [group]: { ...d[group], [field]: value } }))

  return (
    <>
      <PageHeader
        title="Ajustes generales"
        description="Contacto, redes, etiquetas, fotos del estudio y video."
        onSave={save}
        saving={saving}
        status={status}
        dirty={dirty}
      />

      <div className="space-y-6">
        <Card title="Contacto">
          <div className="grid gap-4 md:grid-cols-2">
            {CONTACT_FIELDS.map((f) => (
              <TextInput
                key={f.key}
                label={f.label}
                hint={f.hint}
                value={data.contact[f.key]}
                onChange={setIn('contact', f.key)}
              />
            ))}
          </div>
          <LinesInput
            label="Correos de “Nuevos proyectos” (footer)"
            value={data.newBusiness}
            onChange={set('newBusiness')}
            rows={3}
          />
        </Card>

        <Card title="Redes sociales">
          <ListEditor
            items={data.socials}
            onChange={set('socials')}
            create={() => ({ label: '', href: '' })}
            addLabel="Agregar red"
            itemLabel={(s) => s.label || 'Nueva red'}
            render={(s, setS) => (
              <div className="grid gap-3 md:grid-cols-2">
                <TextInput label="Nombre" value={s.label} onChange={(label) => setS({ ...s, label })} />
                <TextInput label="Enlace" value={s.href} onChange={(href) => setS({ ...s, href })} />
              </div>
            )}
          />
        </Card>

        <Card title="Etiquetas de servicios" description="Los recuadros blancos bajo el título de Servicios.">
          <LinesInput label="Etiquetas" value={data.capabilities} onChange={set('capabilities')} rows={9} />
        </Card>

        <Card title="La vida en Mellow" description="Fotos del estudio en Nosotros (se muestran en blanco y negro).">
          <ListEditor
            items={data.studioLife}
            onChange={set('studioLife')}
            create={() => ''}
            addLabel="Agregar foto"
            itemLabel={(_, i) => `Foto ${i + 1}`}
            render={(src, setSrc) => <MediaInput label="Foto" folder="studio" value={src} onChange={setSrc} />}
          />
        </Card>

        <Card
          title="Video del inicio"
          description="El loop de fondo va sin audio; el reel completo se abre con “Ver reel”. Sube MP4 livianos (el de 1080p idealmente bajo 8 MB)."
        >
          <MediaInput label="Imagen de espera (poster)" folder="media" value={data.media.poster} onChange={setIn('media', 'poster')} />
          <MediaInput label="Loop de fondo — escritorio (1080p)" folder="media" accept="video/mp4,video/webm" value={data.media.heroLoop1080} onChange={setIn('media', 'heroLoop1080')} />
          <MediaInput label="Loop de fondo — móvil (720p)" folder="media" accept="video/mp4,video/webm" value={data.media.heroLoop720} onChange={setIn('media', 'heroLoop720')} />
          <MediaInput label="Reel completo (con audio)" folder="media" accept="video/mp4,video/webm" value={data.media.reel} onChange={setIn('media', 'reel')} />
        </Card>
      </div>
    </>
  )
}
