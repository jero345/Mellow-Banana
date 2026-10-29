import Reveal from '../components/Reveal'
import SectionNumber from '../components/SectionNumber'
import AnimatedText from '../motion/AnimatedText'
import RevealImage from '../motion/RevealImage'
import { useLang } from '../i18n/useLang'
import { useContent } from '../content/useContent'

function Block({ number, children, last = false }) {
  return (
    <section className="shell">
      <div className={`py-16 md:py-24 ${last ? '' : 'border-b border-hairline'}`}>
        <Reveal>
          <SectionNumber>{number}</SectionNumber>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

/**
 * One step of the process. On wide screens the title and description stay
 * pinned while its three slides sit beside them.
 */
function Pillar({ pillar, index }) {
  const { t, f } = useLang()
  const title = f(pillar.title)

  return (
    <div className="mt-20 grid gap-8 first:mt-12 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <AnimatedText as="h3" text={title} className="text-lead text-yellow" delay={index * 0.05} />
        <Reveal delay={160}>
          <p className="mt-3 max-w-[46ch] text-meta text-white/75">
            {f(pillar.body)}
          </p>
        </Reveal>
      </div>

      {/*
        No per-image delay: slides sitting side by side have to unmask in step,
        otherwise mid-reveal a neighbour reads as a smaller image.
      */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pillar.images.filter(Boolean).map((src) => (
          <RevealImage
            key={src}
            src={src}
            alt={t('about.pillar.alt').replace('{title}', title)}
            drift={false}
            className="rounded-xl bg-white/5"
            imgClassName="aspect-4/3"
          />
        ))}
      </div>
    </div>
  )
}

/** "La vida en Mellow": the studio photos, in black and white, running edge to edge. */
function StudioStrip() {
  const { t } = useLang()
  const { studioLife } = useContent().settings

  return (
    <div className="life">
      <ul className="life__track">
        {[0, 1].map((copy) =>
          studioLife.filter(Boolean).map((src) => (
            <li
              key={`${src}-${copy}`}
              className="life__cell"
              // The second copy exists only to make the loop seamless.
              aria-hidden={copy === 1 ? 'true' : undefined}
            >
              <img
                src={src}
                alt={copy === 0 ? t('about.04.alt') : ''}
                loading="lazy"
                className="size-full object-cover grayscale"
              />
            </li>
          )),
        )}
      </ul>
    </div>
  )
}

export default function About() {
  const { t } = useLang()
  const { pillars } = useContent()

  return (
    <>
      {/* 01 — brands that matter */}
      <div className="pt-32 md:pt-40">
        <Block number="01">
          <AnimatedText
            as="p"
            text={t('about.01.eyebrow')}
            className="mt-8 text-title text-yellow"
            delay={0.1}
          />
          <AnimatedText
            as="h1"
            text={t('about.01.body')}
            className="mt-6 max-w-[34ch] text-title"
            delay={0.25}
            stagger={0.035}
          />
        </Block>
      </div>

      {/* 02 — how we think */}
      <Block number="02">
        <Reveal>
          <p className="mt-8 max-w-[78ch] text-body text-white/85">{t('about.02.body')}</p>
        </Reveal>
      </Block>

      {/* 03 — how we do it */}
      <Block number="03" last>
        <AnimatedText
          as="h2"
          text={t('about.03.title')}
          className="mt-8 text-title text-yellow"
          delay={0.1}
        />

        {pillars.map((pillar, i) => (
          <Pillar key={pillar.key} pillar={pillar} index={i} />
        ))}
      </Block>

      {/* 04 — life at Mellow */}
      <section className="pb-24 md:pb-32">
        <div className="shell py-16 md:pt-24 md:pb-14">
          <Reveal>
            <SectionNumber>04</SectionNumber>
          </Reveal>
          <AnimatedText
            as="h2"
            text={t('about.04.title')}
            className="mt-8 text-title text-yellow"
            delay={0.1}
          />
          <AnimatedText
            as="p"
            text={t('about.04.body')}
            className="mt-8 max-w-[44ch] text-lead"
            delay={0.2}
            stagger={0.03}
          />
        </div>

        <Reveal delay={120}>
          <StudioStrip />
        </Reveal>
      </section>
    </>
  )
}
