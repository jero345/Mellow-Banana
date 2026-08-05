import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Reveal from '../components/Reveal'
import Pill from '../components/Pill'
import CursorLabel from '../components/CursorLabel'
import ProjectCarousel from '../components/ProjectCarousel'
import HeroVideo from '../components/HeroVideo'
import ReelModal from '../components/ReelModal'
import ClientWall from '../components/ClientWall'
import CtaBand from '../components/CtaBand'
import AnimatedText from '../motion/AnimatedText'
import RevealImage from '../motion/RevealImage'
import Magnetic from '../motion/Magnetic'
import { EASE, DUR } from '../motion/tokens'
import { useLang } from '../i18n/useLang'
import { CATEGORIES, featuredProjects, recent } from '../data/projects'

/* ─────────────────────────────── Hero ─────────────────────────────── */

function Hero({ onPlay }) {
  const { t } = useLang()
  const ref = useRef(null)
  const reduced = useReducedMotion()

  // Everything in the hero drifts apart as it scrolls away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 190])
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.72])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  const drift = reduced ? {} : { y: headlineY, opacity: headlineOpacity }
  const orbDrift = reduced ? {} : { y: orbY, scale: orbScale }

  return (
    <section ref={ref} className="relative flex min-h-svh items-center overflow-hidden">
      <HeroVideo progress={scrollYProgress} />

      <div className="shell relative w-full">
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

        {/*
          On the artboard the reel orb overlaps the tail of the headline. It is
          placed just past where the line ends so the layering reads as
          deliberate without covering the words.
        */}
        <motion.div
          style={orbDrift}
          className="mt-14 flex md:absolute md:top-1/2 md:left-[46%] md:mt-0 md:-translate-y-1/2"
        >
          <Magnetic strength={0.16}>
            <motion.button
              type="button"
              onClick={onPlay}
              initial={reduced ? false : { opacity: 0, scale: 0.86 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.45 }}
              className="group relative grid size-40 place-items-center rounded-full md:size-56 lg:size-64"
            >
              {/* Yellow bloom — a child of the orb so it tracks it at every size. */}
              <motion.span
                aria-hidden="true"
                animate={reduced ? undefined : { scale: [1, 1.09, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
                className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[190%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,241,3,0.26)_0%,rgba(255,241,3,0.06)_42%,transparent_68%)] blur-2xl"
              />
              {/* Semi-transparent so the reel reads through it, as on the artboard. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(42,42,36,0.72)_0%,rgba(12,12,10,0.86)_58%,rgba(0,0,0,0.92)_100%)] shadow-[inset_0_0_60px_rgba(255,241,3,0.14),0_0_90px_rgba(255,241,3,0.10)] backdrop-blur-md transition-transform duration-900 ease-brand group-hover:scale-105"
              />
              {/* Ring that pulses outward, like a play indicator at rest. */}
              <motion.span
                aria-hidden="true"
                animate={reduced ? undefined : { scale: [1, 1.22], opacity: [0.5, 0] }}
                transition={{ duration: 3.4, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.6 }}
                className="absolute inset-0 rounded-full border border-yellow/45"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-white/10 transition-colors duration-700 group-hover:border-yellow/40"
              />
              <span className="relative text-lead font-light text-white transition-colors duration-500 group-hover:text-yellow">
                {t('home.hero.play')}
              </span>
            </motion.button>
          </Magnetic>
        </motion.div>

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
                delay={i * 0.1}
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
