import Reveal from '../components/Reveal'
import Pill from '../components/Pill'
import SectionNumber from '../components/SectionNumber'
import ProjectCard from '../components/ProjectCard'
import ClientWall from '../components/ClientWall'
import CtaBand from '../components/CtaBand'
import { useLang } from '../i18n/useLang'
import { capabilities, sectors, pillars } from '../data/site'
import { getProject } from '../data/projects'

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

/** One service pillar: title, description, and three real brand examples. */
function Pillar({ pillar, index }) {
  const { t } = useLang()
  const works = pillar.works.map(getProject).filter(Boolean)

  return (
    <Reveal delay={index * 90} className="mt-16 first:mt-12">
      <h3 className="text-lead text-yellow">{t(`pillar.${pillar.key}.title`)}</h3>
      <p className="mt-3 max-w-[52ch] text-meta text-white/75">{t(`pillar.${pillar.key}.body`)}</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((project) => (
          <ProjectCard
            key={`${pillar.key}-${project.slug}`}
            project={project}
            ratio="aspect-4/3"
            showMeta={false}
          />
        ))}
      </div>
    </Reveal>
  )
}

export default function About() {
  const { t } = useLang()

  return (
    <>
      {/* 01 — who we are */}
      <div className="pt-32 md:pt-40">
        <Block number="01">
          <Reveal delay={80}>
            <p className="mt-8 text-title text-yellow">{t('about.01.eyebrow')}</p>
            <h1 className="mt-6 max-w-[34ch] text-title text-balance-tight">
              {t('about.01.body')}
            </h1>
          </Reveal>
        </Block>
      </div>

      {/* 02 — why branding */}
      <Block number="02">
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="max-w-[52ch] text-body text-white/85">{t('about.02.p1')}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[52ch] text-body text-white/85">{t('about.02.p2')}</p>
          </Reveal>
        </div>
      </Block>

      {/* 03 — what we do */}
      <Block number="03">
        <Reveal delay={80}>
          <h2 className="mt-8 text-title text-yellow">{t('about.03.title')}</h2>
        </Reveal>

        <Reveal delay={140} className="mt-10 flex max-w-208 flex-wrap gap-1.5">
          {capabilities.map((item) => (
            <Pill key={item} variant="solid">
              {item}
            </Pill>
          ))}
        </Reveal>

        {pillars.map((pillar, i) => (
          <Pillar key={pillar.key} pillar={pillar} index={i} />
        ))}
      </Block>

      {/* 04 — clients */}
      <Block number="04">
        <Reveal delay={80}>
          <h2 className="mt-8 text-title text-yellow">{t('about.04.title')}</h2>
        </Reveal>

        <Reveal delay={140} className="mt-10 flex max-w-208 flex-wrap gap-1.5">
          {sectors.map((item) => (
            <Pill key={item} variant="solid">
              {item}
            </Pill>
          ))}
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-10 max-w-[52ch] text-body text-white/85">{t('about.04.body')}</p>
        </Reveal>

        <Reveal delay={220} className="mt-14">
          <ClientWall invert />
        </Reveal>
      </Block>

      {/* 05 — the team */}
      <Block number="05" last>
        <Reveal delay={80}>
          <h2 className="mt-8 text-title text-yellow">{t('about.05.title')}</h2>
          <p className="mt-6 max-w-[52ch] text-body text-white/85">{t('about.05.body')}</p>
        </Reveal>

        <Reveal delay={140} className="mt-12 overflow-hidden rounded-xl">
          <img
            src="/assets/team-office.jpg"
            alt={t('about.05.alt')}
            loading="lazy"
            className="aspect-21/9 w-full object-cover"
          />
        </Reveal>
      </Block>

      <CtaBand />
    </>
  )
}
