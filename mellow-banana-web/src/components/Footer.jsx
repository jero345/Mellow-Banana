import { Wordmark } from './Brand'
import { contact, socials } from '../data/site'
import { useLang } from '../i18n/useLang'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-white">
      <div className="shell py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-[auto_1fr_1fr_auto] md:items-start md:gap-12">
          {/* Sized by width so it scales with the screen: full width on phones, ~30vw on desktop. */}
          <Wordmark fluid className="w-full text-white md:w-[clamp(20rem,30vw,34rem)]" />

          <div className="text-meta">
            <p className="text-yellow">{t('footer.jobs')}</p>
            <a href={`mailto:${contact.email}`} className="link-underline mt-1 inline-block">
              {contact.email}
            </a>
          </div>

          <div className="text-meta md:text-center">
            <a href={`tel:${contact.phoneHref}`} className="link-underline inline-block">
              {contact.phone}
            </a>
            <p className="mt-1 text-white/70">{contact.address}</p>
          </div>

          <nav aria-label="Social" className="flex gap-6 text-meta md:gap-8">
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

        <p className="mt-12 text-meta text-white/40">
          ©{year} Mellow &amp; Banana. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
