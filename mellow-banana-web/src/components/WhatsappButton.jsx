import { contact } from '../data/site'
import { useLang } from '../i18n/useLang'

/**
 * Floating WhatsApp button — fixed to the bottom-right of the viewport on
 * every page. The pulsing rings and the hover label live in index.css
 * (`.wa-float`) so they can use keyframes and pseudo-elements.
 */
export default function WhatsappButton({ className = '' }) {
  const { t } = useLang()

  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t('cta.whatsapp')}
      className={`wa-float ${className}`}
    >
      <span className="wa-float__label" aria-hidden="true">
        {t('cta.whatsapp')}
      </span>

      <span className="wa-float__disc">
        <svg viewBox="0 0 24 24" className="wa-float__icon" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.83 9.83 0 0 0 4.69 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm5.78 14.06c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.44-.72-2.9-1.16-4.72-4.2-4.86-4.4-.14-.2-1.15-1.56-1.15-2.98 0-1.42.73-2.12 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.6.63.5.22.55.76 1.9.83 2.04.07.14.11.3.02.48-.1.19-.15.3-.29.47-.14.16-.3.36-.43.48-.14.14-.29.29-.12.57.17.29.75 1.24 1.6 2 1.1.98 2.03 1.29 2.32 1.43.29.15.46.12.63-.07.17-.2.72-.84.91-1.13.19-.29.39-.24.65-.14.26.09 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.7-.17 1.38Z" />
        </svg>
      </span>
    </a>
  )
}
