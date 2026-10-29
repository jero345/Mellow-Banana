import { useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll } from 'motion/react'
import Reveal from '../components/Reveal'
import Pill from '../components/Pill'
import ArrowButton from '../components/ArrowButton'
import ProjectCarousel from '../components/ProjectCarousel'
import HeroVideo from '../components/HeroVideo'
import ReelModal from '../components/ReelModal'
import ReelOrb, { StaticReelButton, useFinePointer } from '../components/ReelOrb'
import ClientWall from '../components/ClientWall'
import AnimatedText from '../motion/AnimatedText'
import Magnetic from '../motion/Magnetic'
import { EASE } from '../motion/tokens'
import { useLang } from '../i18n/useLang'
import { CATEGORIES } from '../data/projects'
import { useProjects } from '../content/useContent'

/* ─────────────────────────────── Hero ─────────────────────────────── */

function Hero({ onPlay }) {
  const { t } = useLang()
  const ref = useRef(null)
  const reduced = useReducedMotion()
  // With a real pointer the orb becomes the cursor over the whole hero;
  // otherwise it stays a button under the headline.
  const orbFollows = useFinePointer()

  // Drives the video sinking away as the hero scrolls out.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // The artboard shows the reel alone: no headline over it, just the "Ver reel" orb.
  return (
    <section ref={ref} className="relative flex min-h-svh items-end overflow-hidden">
      <HeroVideo progress={scrollYProgress} />

      {orbFollows ? (
        <ReelOrb hostRef={ref} onPlay={onPlay} label={t('home.hero.play')} />
      ) : (
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.86 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.45 }}
          className="shell relative z-20 flex w-full justify-center pb-16"
        >
          <StaticReelButton onPlay={onPlay} label={t('home.hero.play')} />
        </motion.div>
      )}
    </section>
  )
}

/* ─────────────────────────────── Intro ────────────────────────────── */

function Intro() {
  const { t } = useLang()

  return (
    <section className="shell py-24 md:py-36">
      <AnimatedText as="h2" text={t('home.intro.title')} className="text-title text-yellow" />
      <Reveal delay={160}>
        <p className="mt-10 max-w-[66ch] text-body text-white/90">{t('home.intro.body')}</p>
      </Reveal>
      <Reveal delay={260} className="mt-12 flex">
        <Magnetic strength={0.3}>
          <ArrowButton to="/about" tone="yellow">
            {t('home.intro.more')}
          </ArrowButton>
        </Magnetic>
      </Reveal>
    </section>
  )
}

/* ─────────────────────────── Work carousel ────────────────────────── */

function Work() {
  const { t } = useLang()
  const [filter, setFilter] = useState(null)
  const projects = useProjects()
  const featuredProjects = useMemo(() => projects.filter((p) => p.featured), [projects])

  const items = useMemo(() => {
    if (!filter) return featuredProjects
    const matched = featuredProjects.filter((p) => p.categories.includes(filter))
    return matched.length ? matched : featuredProjects
  }, [filter, featuredProjects])

  return (
    <section className="border-t border-hairline py-20 md:py-28">
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
      <Clients />
      <ReelModal open={reelOpen} onClose={() => setReelOpen(false)} />
    </>
  )
}
