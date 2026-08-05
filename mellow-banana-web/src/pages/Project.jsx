import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Pill from '../components/Pill'
import CaseBlock from '../components/CaseBlocks'
import ProjectCard from '../components/ProjectCard'
import CtaBand from '../components/CtaBand'
import NotFound from './NotFound'
import { useLang } from '../i18n/useLang'
import { getProject, projects } from '../data/projects'

export default function Project() {
  const { slug } = useParams()
  const { t, f } = useLang()
  const project = getProject(slug)

  if (!project) return <NotFound />

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <>
      {/* ── Title block ── */}
      <section className="shell pt-32 md:pt-40">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-hairline pb-6">
          <h1 className="text-title whitespace-pre-line">{f(project.client)}</h1>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-meta text-white/50">{t('project.category')}</span>
            {project.categories.map((cat) => (
              <Pill key={cat}>{t(`work.filter.${cat}`)}</Pill>
            ))}
            <Pill>{f(project.sector)}</Pill>
          </div>
        </Reveal>
      </section>

      {/* ── Tagline + intro ── */}
      <section className="shell py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="text-tagline whitespace-pre-line uppercase">{f(project.tagline)}</p>
          </Reveal>

          <Reveal delay={120} className="space-y-6">
            {project.intro.map((para, i) => (
              <p key={i} className="text-body text-white/85">
                {f(para)}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Case study ── */}
      {project.blocks?.length ? (
        project.blocks.map((block, i) => <CaseBlock key={`${block.kind}-${i}`} block={block} />)
      ) : (
        <section className="shell pb-8">
          <Reveal className="overflow-hidden rounded-xl bg-white/5">
            <img
              src={project.cover}
              alt={f(project.coverAlt)}
              className="aspect-16/9 w-full object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-meta text-white/50">{t('project.soon')}</p>
          </Reveal>
        </section>
      )}

      {/* ── More projects ── */}
      <section className="shell py-16 md:py-24">
        <Reveal className="flex items-baseline justify-between gap-4">
          <h2 className="text-lead">{t('project.more')}</h2>
          <Link to="/work" className="link-underline text-meta text-white/70">
            {t('project.back')}
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other, i) => (
            <Reveal key={other.slug} delay={i * 110}>
              <ProjectCard project={other} ratio="aspect-16/10" />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
