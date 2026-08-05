import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Pill from '../components/Pill'
import CursorLabel from '../components/CursorLabel'
import ProjectCarousel from '../components/ProjectCarousel'
import HeroVideo from '../components/HeroVideo'
import ReelModal from '../components/ReelModal'
import ClientWall from '../components/ClientWall'
import CtaBand from '../components/CtaBand'
import { useLang } from '../i18n/useLang'
import { CATEGORIES, featuredProjects, recent } from '../data/projects'

/* ─────────────────────────────── Hero ─────────────────────────────── */

function Hero({ onPlay }) {
  const { t } = useLang()
  const words = t('home.hero.line').split(' ')

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      <HeroVideo />

      <div className="shell relative w-full">
        <h1 className="text-display text-yellow">
          {words.map((word, i) => (
            <span key={`${word}-${i}`}>
              <span
                className="stagger-word"
                style={{ '--word-delay': `${180 + i * 110}ms` }}
              >
                {word}
              </span>
              {i < words.length - 1 ? ' ' : null}
            </span>
          ))}
        </h1>

        {/*
          On the artboard the reel orb overlaps the tail of the headline. It is
          placed just past where the line ends so the layering reads as
          deliberate without covering the words.
        */}
        <div className="mt-14 flex md:absolute md:top-1/2 md:left-[46%] md:mt-0 md:-translate-y-1/2">
          <button
            type="button"
            onClick={onPlay}
            className="group relative grid size-40 place-items-center rounded-full md:size-56 lg:size-64"
          >
            {/* Yellow bloom — a child of the orb so it tracks it at every size. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[190%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,241,3,0.26)_0%,rgba(255,241,3,0.06)_42%,transparent_68%)] blur-2xl transition-opacity duration-700 group-hover:opacity-80"
            />
            {/* Semi-transparent so the reel reads through it, as on the artboard. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(42,42,36,0.72)_0%,rgba(12,12,10,0.86)_58%,rgba(0,0,0,0.92)_100%)] shadow-[inset_0_0_60px_rgba(255,241,3,0.14),0_0_90px_rgba(255,241,3,0.10)] backdrop-blur-md transition-transform duration-900 ease-brand group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-white/10 transition-colors duration-700 group-hover:border-yellow/40"
            />
            <span className="relative text-lead font-light text-white transition-colors duration-500 group-hover:text-yellow">
              {t('home.hero.play')}
            </span>
          </button>
        </div>

        <p
          aria-hidden="true"
          className="mt-16 hidden text-meta tracking-[0.18em] text-white/35 uppercase md:block"
        >
          {t('home.hero.scroll')}
        </p>
      </div>
    </section>
  )
}

/* ────────────────────────────── Intro ─────────────────────────────── */

function Intro() {
  const { t } = useLang()

  return (
    <section className="shell py-20 md:py-32">
      <Reveal>
        <h2 className="text-display whitespace-pre-line text-yellow">{t('home.intro.title')}</h2>
      </Reveal>
      <Reveal delay={140}>
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
              <div className="overflow-hidden rounded-xl bg-black/5">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover transition-transform duration-1100 ease-brand group-hover:scale-[1.04]"
                />
              </div>
            )

            const body = (
              <>
                <h3 className="mt-5 text-lead leading-snug text-balance-tight">{f(item.title)}</h3>
                <p className="mt-4 text-meta text-ink/70">{f(item.body)}</p>
              </>
            )

            return (
              <Reveal key={f(item.title)} delay={i * 120}>
                {item.slug ? (
                  <CursorLabel label={t('home.recent.read')} variant="circle" as="article">
                    <Link to={`/work/${item.slug}`} className="group block">
                      {media}
                      {body}
                    </Link>
                  </CursorLabel>
                ) : (
                  <article className="group">
                    {media}
                    {body}
                  </article>
                )}
              </Reveal>
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
