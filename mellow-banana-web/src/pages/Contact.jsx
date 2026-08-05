import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import ContactForm from '../components/ContactForm'
import AnimatedText from '../motion/AnimatedText'
import { useLang } from '../i18n/useLang'
import { contact } from '../data/site'

/** One row of the contact table: label on the left, details on the right. */
function Row({ title, email, delay = 0, last = false }) {
  return (
    <div
      className={`grid gap-6 py-10 md:grid-cols-[1fr_2fr] md:gap-12 md:py-12 ${
        last ? '' : 'border-b border-hairline'
      }`}
    >
      <AnimatedText as="h2" text={title} className="text-lead text-yellow" delay={delay} />

      <div>
        <Reveal delay={delay * 1000 + 120}>
          <a
            href={`mailto:${email}`}
            className="link-underline inline-block text-meta text-white/80"
          >
            {email}
          </a>
        </Reveal>
        <AnimatedText
          as="p"
          text={'Carrera 13 No. 96-67\nOficina. 313'}
          className="mt-2 text-title leading-tight"
          delay={delay + 0.1}
          stagger={0.035}
        />
        <Reveal delay={delay * 1000 + 300}>
          <a
            href={`tel:${contact.phoneHref}`}
            className="link-underline mt-4 inline-block text-body text-white/80"
          >
            {contact.phone}
          </a>
        </Reveal>
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
          <AnimatedText
            as="h1"
            text={t('contact.title')}
            className="text-title text-yellow"
            delay={0.12}
          />
          <AnimatedText
            as="p"
            text={t('contact.p1')}
            className="mt-6 max-w-[34ch] text-title"
            delay={0.26}
            stagger={0.035}
          />
          <AnimatedText
            as="p"
            text={t('contact.p2')}
            className="mt-8 max-w-[34ch] text-title"
            delay={0.42}
            stagger={0.03}
          />
        </div>
      </section>

      <section className="shell pb-8 md:pb-16">
        <Row title={t('contact.jobs.title')} email={contact.jobsEmail} />
        <Row title={t('contact.work.title')} email={contact.infoEmail} delay={0.1} last />
      </section>

      <CtaBand>
        <ContactForm />
      </CtaBand>
    </>
  )
}
