import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import ContactForm from '../components/ContactForm'
import { useLang } from '../i18n/useLang'
import { contact } from '../data/site'

/** One row of the contact table: label on the left, details on the right. */
function Row({ title, email, last = false }) {
  return (
    <div
      className={`grid gap-6 py-10 md:grid-cols-[1fr_2fr] md:gap-12 md:py-12 ${
        last ? '' : 'border-b border-hairline'
      }`}
    >
      <h2 className="text-lead whitespace-pre-line text-yellow">{title}</h2>

      <div>
        <a
          href={`mailto:${email}`}
          className="link-underline inline-block text-meta text-white/80"
        >
          {email}
        </a>
        <p className="mt-2 text-title leading-tight">
          Carrera 13 No. 96-67
          <br />
          Oficina. 313
        </p>
        <a
          href={`tel:${contact.phoneHref}`}
          className="link-underline mt-4 inline-block text-body text-white/80"
        >
          {contact.phone}
        </a>
      </div>
    </div>
  )
}

export default function Contact() {
  const { t } = useLang()

  return (
    <>
      <section className="shell pt-32 md:pt-40">
        <div className="border-b border-hairline pb-16 md:pb-24">
          <Reveal>
            <h1 className="text-title text-yellow">{t('contact.title')}</h1>
            <p className="mt-6 max-w-[34ch] text-title text-balance-tight">{t('contact.p1')}</p>
            <p className="mt-8 max-w-[34ch] text-title text-balance-tight">{t('contact.p2')}</p>
          </Reveal>
        </div>
      </section>

      <section className="shell pb-8 md:pb-16">
        <Reveal>
          <Row title={t('contact.jobs.title')} email={contact.jobsEmail} />
        </Reveal>
        <Reveal delay={100}>
          <Row title={t('contact.work.title')} email={contact.infoEmail} />
        </Reveal>
      </section>

      <CtaBand>
        <ContactForm />
      </CtaBand>
    </>
  )
}
