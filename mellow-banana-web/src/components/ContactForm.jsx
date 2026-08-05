import { useState } from 'react'
import { useLang } from '../i18n/useLang'
import { contact } from '../data/site'

/** Underlined field, matching the form on the Contact artboard. */
function Field({ id, label, type = 'text', value, onChange, error, ...rest }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full border-b border-ink/35 bg-transparent pt-3 pb-2 text-meta text-ink placeholder:text-ink/60 focus:border-ink focus:outline-none"
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-[0.75rem] text-[#b40000]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

const EMPTY = { name: '', company: '', mail: '', phone: '', message: '' }

/**
 * Posts to a mailto: draft — there is no backend yet, so this keeps the form
 * functional without silently dropping enquiries. Swap `submit` for a fetch to
 * your endpoint (Formspree / Resend / n8n webhook) when one is available.
 */
export default function ContactForm() {
  const { t } = useLang()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = t('form.error.name')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.mail.trim())) next.mail = t('form.error.mail')
    if (values.message.trim().length < 8) next.message = t('form.error.message')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (event) => {
    event.preventDefault()
    if (!validate()) return

    const body = [
      `${t('form.name')}: ${values.name}`,
      `${t('form.company')}: ${values.company}`,
      `${t('form.mail')}: ${values.mail}`,
      `${t('form.phone')}: ${values.phone}`,
      '',
      values.message,
    ].join('\n')

    window.location.href =
      `mailto:${contact.email}` +
      `?subject=${encodeURIComponent(`Web — ${values.name}`)}` +
      `&body=${encodeURIComponent(body)}`

    setSent(true)
    setValues(EMPTY)
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-xl border border-ink/45 p-6 md:p-8"
      aria-label={t('contact.title')}
    >
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8">
        <Field
          id="name"
          label={t('form.name')}
          value={values.name}
          onChange={set('name')}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="company"
          label={t('form.company')}
          value={values.company}
          onChange={set('company')}
          autoComplete="organization"
        />
        <Field
          id="mail"
          label={t('form.mail')}
          type="email"
          value={values.mail}
          onChange={set('mail')}
          error={errors.mail}
          autoComplete="email"
        />
        <Field
          id="phone"
          label={t('form.phone')}
          type="tel"
          value={values.phone}
          onChange={set('phone')}
          autoComplete="tel"
        />
        <div className="sm:col-span-2">
          <Field
            id="message"
            label={t('form.message')}
            value={values.message}
            onChange={set('message')}
            error={errors.message}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="link-underline text-meta text-ink"
        >
          {t('form.submit')}
        </button>
        {sent ? (
          <p role="status" className="text-meta text-ink/70">
            {t('form.sent')}
          </p>
        ) : null}
      </div>
    </form>
  )
}
