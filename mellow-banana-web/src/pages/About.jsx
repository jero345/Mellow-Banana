import Reveal from '../components/Reveal'
import Pill from '../components/Pill'
import SectionNumber from '../components/SectionNumber'
import ProjectCard from '../components/ProjectCard'
import ClientWall from '../components/ClientWall'
import CtaBand from '../components/CtaBand'
import AnimatedText from '../motion/AnimatedText'
import RevealImage from '../motion/RevealImage'
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

/**
 * One service pillar. On wide screens the title and description stay pinned
 * while the three brand examples scroll past them.
 */
function Pillar({ pillar, index }) {
  const { t } = useLang()
  const works = pillar.works.map(getProject).filter(Boolean)

  return (
    <div className="mt-20 grid gap-8 first:mt-12 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <AnimatedText
          as="h3"
          text={t(`pillar.${pillar.key}.title`)}
          className="text-lead text-yellow"
          delay={index * 0.05}
        />
        <Reveal delay={160}>
          <p className="mt-3 max-w-[46ch] text-meta text-white/75">
            {t(`pillar.${pillar.key}.body`)}
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((project, i) => (
          <ProjectCard
            key={`${pillar.key}-${project.slug}`}
            project={project}
            ratio="aspect-4/3"
            showMeta={false}
            delay={i * 0.1}
          />
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const { t } = useLang()

  return (
    <>
      {/* 01 — who we are */}
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

      {/* 02 — why branding */}
      <Block number="02">
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="max-w-[52ch] text-body text-white/85">{t('about.02.p1')}</p>
          </Reveal>
          <Reveal delay={160}>
            <p className="max-w-[52ch] text-body text-white/85">{t('about.02.p2')}</p>
          </Reveal>
        </div>
      </Block>

      {/* 03 — what we do */}
      <Block number="03">
        <AnimatedText
          as="h2"
          text={t('about.03.title')}
          className="mt-8 text-title text-yellow"
          delay={0.1}
        />

        <div className="mt-10 flex max-w-208 flex-wrap gap-1.5">
          {capabilities.map((item, i) => (
            <Reveal key={item} delay={i * 45} y={12}>
              <Pill variant="solid">{item}</Pill>
            </Reveal>
          ))}
        </div>

        {pillars.map((pillar, i) => (
          <Pillar key={pillar.key} pillar={pillar} index={i} />
        ))}
      </Block>

      {/* 04 — clients */}
      <Block number="04">
        <AnimatedText
          as="h2"
          text={t('about.04.title')}
          className="mt-8 text-title text-yellow"
          delay={0.1}
        />

        <div className="mt-10 flex max-w-208 flex-wrap gap-1.5">
          {sectors.map((item, i) => (
            <Reveal key={item} delay={i * 40} y={12}>
              <Pill variant="solid">{item}</Pill>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220}>
          <p className="mt-10 max-w-[52ch] text-body text-white/85">{t('about.04.body')}</p>
        </Reveal>

        <Reveal delay={280} className="mt-14">
          <ClientWall invert />
        </Reveal>
      </Block>

      {/* 05 — the team */}
      <Block number="05" last>
        <AnimatedText
          as="h2"
          text={t('about.05.title')}
          className="mt-8 text-title text-yellow"
          delay={0.1}
        />
        <Reveal delay={200}>
          <p className="mt-6 max-w-[52ch] text-body text-white/85">{t('about.05.body')}</p>
        </Reveal>

        <RevealImage
          src="/assets/team-office.jpg"
          alt={t('about.05.alt')}
          className="mt-12 rounded-xl"
          imgClassName="aspect-21/9"
        />
      </Block>

      <CtaBand />
    </>
  )
}
