import { useId, useState } from 'react'
import { uploadMedia } from './db'

/*
  Form building blocks for the admin. Deliberately plain: a light, legible
  interface people can fill in quickly, separate from the site's visual system.
*/

const input =
  'w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10'

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium tracking-wide text-neutral-600 uppercase">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-neutral-500">{hint}</span> : null}
    </label>
  )
}

export function TextInput({ label, hint, value, onChange, multiline = false, rows = 3, ...rest }) {
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <Field label={label} hint={hint}>
      <Tag
        className={input}
        value={value ?? ''}
        rows={multiline ? rows : undefined}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </Field>
  )
}

/** A { es, en } pair, side by side. */
export function BiInput({ label, hint, value, onChange, multiline = false, rows = 3 }) {
  const v = value ?? {}
  return (
    <fieldset>
      <legend className="mb-1.5 text-xs font-medium tracking-wide text-neutral-600 uppercase">
        {label}
      </legend>
      <div className="grid gap-3 md:grid-cols-2">
        {['es', 'en'].map((lang) => {
          const Tag = multiline ? 'textarea' : 'input'
          return (
            <div key={lang} className="relative">
              <span className="pointer-events-none absolute top-2 right-2 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500 uppercase">
                {lang}
              </span>
              <Tag
                className={`${input} pr-10`}
                value={v[lang] ?? ''}
                rows={multiline ? rows : undefined}
                onChange={(e) => onChange({ ...v, [lang]: e.target.value })}
                aria-label={`${label} (${lang})`}
              />
            </div>
          )
        })}
      </div>
      {hint ? <p className="mt-1 text-xs text-neutral-500">{hint}</p> : null}
    </fieldset>
  )
}

export function Checkbox({ label, checked, onChange }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-neutral-800">
      <input
        type="checkbox"
        className="size-4 accent-neutral-900"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  )
}

export function Select({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <select className={input} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

/** A list of plain strings, one per line. */
export function LinesInput({ label, hint, value, onChange, rows = 5 }) {
  return (
    <TextInput
      label={label}
      hint={hint ?? 'Uno por línea.'}
      multiline
      rows={rows}
      value={(value ?? []).join('\n')}
      onChange={(text) => onChange(text.split('\n').map((s) => s.trim()).filter(Boolean))}
    />
  )
}

const isVideo = (url) => /\.(mp4|webm|mov)(\?|$)/i.test(url ?? '')

/** A media URL with a preview and an upload button that fills it in. */
export function MediaInput({ label, hint, value, onChange, accept = 'image/*', folder = 'uploads' }) {
  const id = useId()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const upload = async (file) => {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      onChange(await uploadMedia(file, folder))
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium tracking-wide text-neutral-600 uppercase">
        {label}
      </span>
      <div className="flex gap-3">
        <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-100">
          {value ? (
            isVideo(value) ? (
              <video src={value} muted className="size-full object-cover" />
            ) : (
              <img src={value} alt="" className="size-full object-cover" />
            )
          ) : (
            <span className="text-[10px] text-neutral-400">sin archivo</span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input
            className={input}
            value={value ?? ''}
            placeholder="https://… o /assets/…"
            onChange={(e) => onChange(e.target.value)}
            aria-label={`${label} (URL)`}
          />
          <div className="flex items-center gap-3">
            <label
              htmlFor={id}
              className="cursor-pointer rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-800 hover:border-neutral-900"
            >
              {busy ? 'Subiendo…' : 'Subir archivo'}
            </label>
            <input
              id={id}
              type="file"
              accept={accept}
              className="sr-only"
              disabled={busy}
              onChange={(e) => upload(e.target.files?.[0])}
            />
            {error ? <span className="text-xs text-red-600">{error}</span> : null}
          </div>
          {hint ? <p className="text-xs text-neutral-500">{hint}</p> : null}
        </div>
      </div>
    </div>
  )
}

/**
 * An ordered list of items with add / remove / reorder. `render(item, set)`
 * draws one item's fields; `create()` returns a blank one.
 */
export function ListEditor({ items, onChange, render, create, addLabel = 'Agregar', itemLabel }) {
  const list = items ?? []
  const set = (i, next) => onChange(list.map((it, j) => (j === i ? next : it)))
  const move = (i, d) => {
    const j = i + d
    if (j < 0 || j >= list.length) return
    const next = [...list]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  const remove = (i) => {
    if (window.confirm('¿Eliminar este elemento?')) onChange(list.filter((_, j) => j !== i))
  }

  return (
    <div className="space-y-3">
      {list.map((item, i) => (
        <div key={i} className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-neutral-500">
              {itemLabel ? itemLabel(item, i) : `#${i + 1}`}
            </span>
            <div className="flex gap-1">
              <IconButton label="Subir" onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </IconButton>
              <IconButton label="Bajar" onClick={() => move(i, 1)} disabled={i === list.length - 1}>
                ↓
              </IconButton>
              <IconButton label="Eliminar" onClick={() => remove(i)} danger>
                ✕
              </IconButton>
            </div>
          </div>
          {render(item, (next) => set(i, next), i)}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...list, create()])}
        className="w-full rounded-lg border border-dashed border-neutral-300 py-3 text-sm font-medium text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
      >
        + {addLabel}
      </button>
    </div>
  )
}

export function IconButton({ label, danger = false, children, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`grid size-7 place-items-center rounded border text-xs transition disabled:opacity-30 ${
        danger
          ? 'border-red-200 text-red-600 hover:bg-red-50'
          : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'
      }`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Button({ variant = 'primary', className = '', ...rest }) {
  const styles = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-700',
    secondary: 'border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900',
    danger: 'border border-red-200 bg-white text-red-600 hover:bg-red-50',
  }
  return (
    <button
      type="button"
      className={`rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`}
      {...rest}
    />
  )
}

export function Card({ title, description, children }) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-5 md:p-6">
      {title ? <h2 className="text-base font-semibold text-neutral-900">{title}</h2> : null}
      {description ? <p className="mt-1 text-sm text-neutral-500">{description}</p> : null}
      <div className={title || description ? 'mt-5 space-y-5' : 'space-y-5'}>{children}</div>
    </section>
  )
}

/** Page header with the save action and its status. */
export function PageHeader({ title, description, onSave, saving, status, dirty, actions }) {
  return (
    <div className="sticky top-0 z-10 -mx-4 mb-6 border-b border-neutral-200 bg-neutral-50/95 px-4 py-4 backdrop-blur md:-mx-8 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900">{title}</h1>
          {description ? <p className="mt-0.5 text-sm text-neutral-500">{description}</p> : null}
        </div>
        <div className="flex items-center gap-3">
          {status ? (
            <span className={`text-sm ${status.error ? 'text-red-600' : 'text-emerald-700'}`}>
              {status.text}
            </span>
          ) : dirty ? (
            <span className="text-sm text-amber-700">Cambios sin guardar</span>
          ) : null}
          {actions}
          {onSave ? (
            <Button onClick={onSave} disabled={saving || !dirty}>
              {saving ? 'Guardando…' : 'Guardar'}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
