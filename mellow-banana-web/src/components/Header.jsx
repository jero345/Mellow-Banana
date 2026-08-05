import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Wordmark } from './Brand'
import { useLang } from '../i18n/useLang'
import { nav, contact, socials } from '../data/site'

function LangSwitch({ className = '' }) {
  const { lang, toggle } = useLang()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
      className={`text-meta tracking-wide ${className}`}
    >
      <span className={lang === 'es' ? 'text-white' : 'text-smoke'}>Es</span>
      <span className="text-smoke">/</span>
      <span className={lang === 'en' ? 'text-white' : 'text-smoke'}>En</span>
    </button>
  )
}

export default function Header() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Close the overlay on navigation.
  useEffect(() => setOpen(false), [pathname])

  // Lock scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 140 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-yellow focus:px-4 focus:py-2 focus:text-ink"
      >
        {t('nav.skip')}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-brand ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="shell flex items-center justify-between py-6 md:py-7">
          <Link to="/" aria-label="Mellow & Banana — home" className="relative z-10">
            <Wordmark className="h-4 text-yellow transition-opacity duration-500 hover:opacity-70 md:h-[1.15rem]" />
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-12 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                className={({ isActive }) =>
                  `link-underline text-meta ${isActive ? 'text-white' : 'text-white/85 hover:text-white'}`
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <LangSwitch className="ml-4" />
          </nav>

          {/* mobile trigger */}
          <div className="flex items-center gap-5 md:hidden">
            <LangSwitch />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 flex size-8 flex-col items-end justify-center gap-1.5"
            >
              <span className="sr-only">{open ? t('nav.close') : t('nav.menu')}</span>
              <span
                className={`block h-px w-7 bg-current transition-transform duration-500 ease-brand ${
                  open ? 'translate-y-[3.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-px bg-current transition-all duration-500 ease-brand ${
                  open ? 'w-7 -translate-y-[3.5px] -rotate-45' : 'w-5'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* full-screen mobile menu — the "Menú" screen from the deck */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={`fixed inset-0 z-40 bg-ink transition-opacity duration-500 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="shell flex h-full flex-col justify-between pt-28 pb-10">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {nav.map((item, i) => (
              <NavLink
                key={item.key}
                to={item.to}
                style={{ '--word-delay': `${120 + i * 70}ms` }}
                className={({ isActive }) =>
                  `text-title ${open ? 'stagger-word' : ''} ${isActive ? 'text-yellow' : 'text-white'}`
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-col gap-6 text-meta text-white/70">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener">
                  {s.label}
                </a>
              ))}
            </div>
            <div className="space-y-1">
              <a href={`mailto:${contact.email}`} className="block text-white">
                {contact.email}
              </a>
              <a href={`tel:${contact.phoneHref}`} className="block">
                {contact.phone}
              </a>
              <p>{contact.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
