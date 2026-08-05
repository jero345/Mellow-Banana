import { Link } from 'react-router-dom'
import { useLang } from '../i18n/useLang'

export default function NotFound() {
  const { t } = useLang()

  return (
    <section className="shell grid min-h-svh place-items-center py-40">
      <div className="max-w-[34ch]">
        <p className="text-display text-yellow">404</p>
        <h1 className="mt-4 text-title">{t('nf.title')}</h1>
        <p className="mt-4 text-body text-white/70">{t('nf.body')}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-yellow px-6 py-2.5 text-meta text-ink transition-colors duration-500 ease-brand hover:bg-white"
        >
          {t('nf.home')}
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
