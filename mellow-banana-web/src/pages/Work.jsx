import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Reveal from '../components/Reveal'
import Pill from '../components/Pill'
import ProjectCard from '../components/ProjectCard'
import AnimatedText from '../motion/AnimatedText'
import { EASE, DUR } from '../motion/tokens'
import { useLang } from '../i18n/useLang'
import { useContent, useProjects } from '../content/useContent'

export default function Work() {
  const { t, f } = useLang()
  const { industries } = useContent()
  const projects = useProjects()
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState('all')

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.industry === filter)),
    [filter, projects],
  )

  return (
    <>
      <section className="shell pt-32 md:pt-40">
        <AnimatedText as="h1" text={t('work.title')} className="text-display text-yellow" delay={0.1} />

        <Reveal
          delay={200}
          className="mt-16 flex flex-wrap items-start justify-between gap-6 border-b border-hairline pb-6 md:mt-24"
        >
          {/* Width capped so the sectors break into two rows, as on the artboard. */}
          <div className="flex max-w-208 flex-wrap gap-2">
            {[{ key: 'all' }, ...industries].map(({ key: cat, label }) => (
              <Pill
                as="button"
                type="button"
                key={cat}
                active={filter === cat}
                aria-pressed={filter === cat}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? t('work.filter.all') : f(label)}
              </Pill>
            ))}
          </div>
          <p aria-live="polite" className="pt-1.5 text-meta text-white/50">
            {visible.length} {t('work.count')}
          </p>
        </Reveal>
      </section>

      <section className="shell py-14 md:py-20">
        {visible.length ? (
          // Keyed by filter so switching remounts the grid and the cards replay
          // their reveal instead of snapping into place.
          <motion.div
            key={filter}
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: DUR.fast, ease: EASE }}
            className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/*
              No per-card delay: cards sitting side by side have to unmask in
              step, otherwise mid-reveal a neighbour reads as a smaller image.
            */}
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} ratio="aspect-4/3" />
            ))}
          </motion.div>
        ) : (
          <p className="text-body text-white/60">{t('work.empty')}</p>
        )}
      </section>

    </>
  )
}
