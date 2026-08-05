import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Reveal from '../components/Reveal'
import Pill from '../components/Pill'
import CursorLabel from '../components/CursorLabel'
import ProjectCarousel from '../components/ProjectCarousel'
import HeroVideo from '../components/HeroVideo'
import ReelModal from '../components/ReelModal'
import ReelOrb, { StaticReelButton, useFinePointer } from '../components/ReelOrb'
import ClientWall from '../components/ClientWall'
import CtaBand from '../components/CtaBand'
import AnimatedText from '../motion/AnimatedText'
import RevealImage from '../motion/RevealImage'
import { EASE, DUR } from '../motion/tokens'
import { useLang } from '../i18n/useLang'
import { CATEGORIES, featuredProjects, recent } from '../data/projects'

/* ─────────────────────────────── Hero ─────────────────────────────── */

function Hero({ onPlay }) {
  const { t } = useLang()
  const ref = useRef(null)
  const reduced = useReducedMotion()
  // With a real pointer the orb becomes the cursor over the whole hero;
  // otherwise it stays a button under the headline.
  const orbFollows = useFinePointer()

  // Everything in the hero drifts apart as it scrolls away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  const drift = reduced ? {} : { y: headlineY, opacity: headlineOpacity }

  return (
    <section ref={ref} className="relative flex min-h-svh items-center overflow-hidden">
      <HeroVideo progress={scrollYProgress} />

      {orbFollows ? (
        <ReelOrb hostRef={ref} onPlay={onPlay} label={t('home.hero.play')} />
      ) : null}

      {/* Above the trigger, and click-through so the hero stays one big button. */}
      <div className={`shell relative z-20 w-full ${orbFollows ? 'pointer-events-none' : ''}`}>
        <motion.div style={drift}>
          <AnimatedText
            as="h1"
            text={t('home.hero.line')}
            className="text-display text-yellow"
            delay={0.15}
            stagger={0.08}
            duration={DUR.slow}
          />
        </motion.div>

        {!orbFollows ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.86 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.45 }}
            className="mt-14 flex"
          >
            <StaticReelButton onPlay={onPlay} label={t('home.hero.play')} />
          </motion.div>
        ) : null}

        <motion.p
          aria-hidden="true"
          style={reduced ? {} : { opacity: scrollHintOpacity }}
          className="mt-16 hidden overflow-hidden text-meta tracking-[0.18em] text-white/35 uppercase md:block"
        >
          <motion.span
            className="inline-block"
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
          >
            {t('home.hero.scroll')}
          </motion.span>
        </motion.p>
      </div>
    </section>
  )
}

/* ────────────────────────────── Intro ─────────────────────────────── */

function Intro() {
  const { t } = useLang()

  return (
    <section className="shell py-20 md:py-32">
      <AnimatedText
        as="h2"
        text={t('home.intro.title')}
        className="text-display text-yellow"
      />
      <Reveal delay={220}>
        {/* Sits under the heading in the left column, as on the artboard. */}
        <p className="mt-10 max-w-[46ch] text-body text-white/80 md:mt-14">
          {t('home.intro.body')}
        </p>
      </Reveal>
    </section>
  )
}

/* ─────────────────────────── Work carousel ────────────────────────── */

function Work() {
  const { t } = useLang()
  const [filter, setFilter] = useState(null)

  const items = useMemo(() => {
    if (!filter) return featuredProjects
    const matched = featuredProjects.filter((p) => p.categories.includes(filter))
    return matched.length ? matched : featuredProjects
  }, [filter])

  return (
    <section className="pb-20 md:pb-32">
      <div className="shell mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <Reveal>
          <h2 className="text-lead">
            {t('home.work.title')}
            <sup className="ml-1 text-meta text-white/50">20</sup>
          </h2>
        </Reveal>

        <Reveal delay={100} className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Pill
              as="button"
              type="button"
              key={cat}
              active={filter === cat}
              onClick={() => setFilter((f) => (f === cat ? null : cat))}
              aria-pressed={filter === cat}
            >
              {t(`work.filter.${cat}`)}
            </Pill>
          ))}
        </Reveal>
      </div>

      <Reveal delay={80}>
        {/* Keyed so the slider resets to the first match when the filter changes. */}
        <ProjectCarousel key={filter ?? 'all'} items={items} />
      </Reveal>
    </section>
  )
}

/* ───────────────────────── Recent projects ────────────────────────── */

function Recent() {
  const { t, f } = useLang()

  return (
    <section className="bg-paper text-ink">
      <div className="shell py-20 md:py-28">
        <Reveal>
          <h2 className="text-lead">{t('home.recent.title')}</h2>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-14 md:mt-14 md:grid-cols-3">
          {recent.map((item, i) => {
            const media = (
              <RevealImage
                src={item.image}
                alt=""
                className="rounded-xl bg-black/5"
                imgClassName="aspect-4/5 transition-transform duration-1100 ease-brand group-hover:scale-[1.04]"
              />
            )

            const body = (
              <>
                <AnimatedText
                  as="h3"
                  text={f(item.title)}
                  className="mt-5 text-lead leading-snug"
                  delay={0.1 + i * 0.1}
                  stagger={0.018}
                />
                <Reveal delay={260 + i * 100}>
                  <p className="mt-4 text-meta text-ink/70">{f(item.body)}</p>
                </Reveal>
              </>
            )

            return item.slug ? (
              <CursorLabel key={f(item.title)} label={t('home.recent.read')} variant="circle" as="article">
                <Link to={`/work/${item.slug}`} className="group block">
                  {media}
                  {body}
                </Link>
              </CursorLabel>
            ) : (
              <article key={f(item.title)} className="group">
                {media}
                {body}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────── Clients ────────────────────────────── */

function Clients() {
  const { t } = useLang()

  return (
    <section className="bg-paper text-ink">
      <div className="shell border-t border-hairline-dark py-16 md:py-20">
        <Reveal>
          <h2 className="text-center text-lead">{t('home.clients.title')}</h2>
        </Reveal>
        <Reveal delay={120} className="mt-12 md:mt-16">
          <ClientWall />
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export default function Home() {
  const [reelOpen, setReelOpen] = useState(false)

  return (
    <>
      <Hero onPlay={() => setReelOpen(true)} />
      <Intro />
      <Work />
      <Recent />
      <Clients />
      <CtaBand />
      <ReelModal open={reelOpen} onClose={() => setReelOpen(false)} />
    </>
  )
}
