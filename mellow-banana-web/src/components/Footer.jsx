import { Link } from 'react-router-dom'
import ArrowButton from './ArrowButton'
import Reveal from './Reveal'
import AnimatedText from '../motion/AnimatedText'
import Magnetic from '../motion/Magnetic'
import { contact, socials } from '../data/site'
import { useLang } from '../i18n/useLang'

const LEGAL = [
  { key: 'privacy', to: '/privacidad' },
  { key: 'cookies', to: '/cookies' },
  { key: 'terms', to: '/terminos' },
]

/**
 * The footer, laid out as the client's mockup: the claim with the CTA on top
 * (it replaces the yellow band that used to close every page), the office and
 * jobs contact in the middle, and the legal line at the bottom. The three
 * columns share one grid so the legal row lines up under the contact row.
 * Below it <FooterReveal> uncovers the giant wordmark.
 */
export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()
  // The middle column is wider so the three legal links fit on one line.
  const cols = 'md:grid-cols-[1fr_2fr_auto] md:gap-12'

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="shell pt-20 pb-10 md:pt-28 md:pb-12">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-6">
          <AnimatedText as="h2" text={t('footer.claim')} className="text-display" />
          <Reveal delay={260} className="mb-3">
            <Magnetic strength={0.3}>
              <ArrowButton to="/contact" tone="yellow">
                {t('cta.button')}
              </ArrowButton>
            </Magnetic>
          </Reveal>
        </div>

        <div className={`mt-24 grid gap-10 text-meta md:mt-32 ${cols}`}>
          <div>
            <p className="tracking-[0.12em] uppercase">{t('footer.city')}</p>
            <p className="mt-6 text-white/85">{contact.address}</p>
            <a href={`tel:${contact.phoneHref}`} className="link-underline mt-2 inline-block text-white/85">
              {contact.phone}
            </a>
          </div>

          <div className="md:self-end">
            <p className="font-normal">{t('footer.jobs')}</p>
            <a href={`mailto:${contact.email}`} className="link-underline mt-1 inline-block text-white/85">
              {contact.email}
            </a>
          </div>
        </div>

        <div className={`mt-16 grid gap-6 text-meta md:mt-20 md:items-center ${cols}`}>
          <p>© Mellow &amp; Banana {year}</p>

          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2 tracking-wide uppercase">
            {LEGAL.map((item) => (
              <Link key={item.key} to={item.to} className="link-underline whitespace-nowrap">
                {t(`footer.${item.key}`)}
              </Link>
            ))}
          </nav>

          <nav aria-label="Social" className="flex gap-6 md:gap-10">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
