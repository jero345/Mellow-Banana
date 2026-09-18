import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Wordmark } from './Brand'
import { EASE } from '../motion/tokens'
import { useLang } from '../i18n/useLang'
import { nav, contact, socials } from '../data/site'

function LangSwitch({ className = '', dark = false }) {
  const { lang, toggle } = useLang()
  const on = dark ? 'text-ink' : 'text-white'
  const off = dark ? 'text-ink/45' : 'text-smoke'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
      className={`text-meta tracking-wide transition-colors duration-500 ${className}`}
    >
      <span className={lang === 'es' ? on : off}>Es</span>
      <span className={off}>/</span>
      <span className={lang === 'en' ? on : off}>En</span>
    </button>
  )
}

export default function Header() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  // True while the header sits over the home hero (the reel), which is light.
  const [overHero, setOverHero] = useState(pathname === '/')

  // Close the overlay on navigation.
  useEffect(() => setOpen(false), [pathname])

  // Lock scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Hide on scroll down, reveal on scroll up. Also tracks whether the header is
  // still over the hero: it is `min-h-svh`, so "over it" is the first viewport.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 140 && y > last)
      setOverHero(pathname === '/' && y < window.innerHeight - 100)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Everything in the bar goes black over the reel, white over the black pages.
  const dark = overHero && !open

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
            <Wordmark
              className={`h-4 transition-[color,opacity] duration-500 hover:opacity-70 md:h-[1.15rem] ${
                dark ? 'text-ink' : 'text-white'
              }`}
            />
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-12 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                className={({ isActive }) =>
                  `link-underline text-meta transition-colors duration-500 ${
                    dark
                      ? isActive
                        ? 'text-ink'
                        : 'text-ink/80 hover:text-ink'
                      : isActive
                        ? 'text-white'
                        : 'text-white/85 hover:text-white'
                  }`
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <LangSwitch className="ml-4" dark={dark} />
          </nav>

          {/* mobile trigger */}
          <div
            className={`flex items-center gap-5 transition-colors duration-500 md:hidden ${
              dark ? 'text-ink' : 'text-white'
            }`}
          >
            <LangSwitch dark={dark} />
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
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-ink md:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="shell flex h-full flex-col justify-between pt-28 pb-10">
              <nav className="flex flex-col gap-2" aria-label="Mobile">
                {nav.map((item, i) => (
                  // Each label rises out of its own clipping box.
                  <span key={item.key} className="overflow-hidden py-1">
                    <motion.span
                      className="block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.16 + i * 0.07 }}
                    >
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `text-title ${isActive ? 'text-yellow' : 'text-white'}`
                        }
                      >
                        {t(`nav.${item.key}`)}
                      </NavLink>
                    </motion.span>
                  </span>
                ))}
              </nav>

              <motion.div
                className="flex flex-col gap-6 text-meta text-white/70"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              >
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
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
