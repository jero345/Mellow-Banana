import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Reveal from '../components/Reveal'
import Pill from '../components/Pill'
import AnimatedText from '../motion/AnimatedText'
import { EASE, DUR } from '../motion/tokens'
import { useLang } from '../i18n/useLang'
import { useContent } from '../content/useContent'

/** The outlined circle with the diagonal arrow; it turns down when its row is open. */
function Toggle({ open }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-11 shrink-0 place-items-center rounded-full border border-white transition-[transform,background-color,color] duration-500 ease-brand md:size-14 ${
        open ? 'rotate-45 bg-yellow text-ink border-yellow' : 'group-hover:bg-white group-hover:text-ink'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5 md:size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 7l10 10M17 8v9H8" />
      </svg>
    </span>
  )
}

/** One service: a numbered row that opens to its lead and deliverables. */
function Service({ service, index, open, onToggle }) {
  const { t, f } = useLang()
  const id = `service-${service.key}`
  const number = String(index + 1).padStart(2, '0')
  const title = f(service.title)

  return (
    <li className="border-b border-hairline">
      <h2>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${t('services.open')} ${title}`}
          className="group flex w-full items-center gap-6 py-8 text-left md:gap-14 md:py-12"
        >
          <span className="w-[2.2ch] shrink-0 text-display leading-none">{number}</span>
          <span
            className={`flex-1 text-display leading-none transition-colors duration-500 ease-brand ${
              open ? 'text-white' : 'text-smoke group-hover:text-white'
            }`}
          >
            {title}
          </span>
          <Toggle open={open} />
        </button>
      </h2>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={id}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DUR.base, ease: EASE }}
            className="overflow-hidden"
          >
            {/* A spacer as wide as the number keeps the copy under the title, as on the artboard. */}
            <div className="flex gap-6 pb-12 md:gap-14 md:pb-16">
              <span aria-hidden="true" className="hidden w-[2.2ch] shrink-0 text-display md:block" />
              <div>
                <p className="max-w-[30ch] text-lead">{f(service.lead)}</p>
                <ul className="mt-8 space-y-2.5 text-meta text-white/85">
                  {service.items.map((item, i) => (
                    <li key={i}>{f(item)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  )
}

export default function Services() {
  const { t } = useLang()
  const [open, setOpen] = useState(null)
  const { services, settings } = useContent()
  const { capabilities } = settings

  return (
    <section className="shell pt-40 pb-24 md:pt-56 md:pb-36">
      <AnimatedText as="h1" text={t('services.title')} className="text-title text-yellow" delay={0.1} />
      <AnimatedText
        as="p"
        text={t('services.claim')}
        className="mt-3 text-title"
        delay={0.2}
        stagger={0.04}
      />

      <div className="mt-6 flex max-w-136 flex-wrap gap-1.5">
        {capabilities.map((item, i) => (
          <Reveal key={item} delay={260 + i * 40} y={12}>
            <Pill variant="solid">{item}</Pill>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="mt-20 md:mt-28">
        <ul className="max-w-248">
          {services.map((service, i) => (
            <Service
              key={service.key}
              service={service}
              index={i}
              open={open === service.key}
              onToggle={() => setOpen((k) => (k === service.key ? null : service.key))}
            />
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
