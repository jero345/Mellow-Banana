import ArrowButton from './ArrowButton'
import Reveal from './Reveal'
import AnimatedText from '../motion/AnimatedText'
import Magnetic from '../motion/Magnetic'
import { useLang } from '../i18n/useLang'

/**
 * "¡Tienes un proyecto en mente?" — the yellow band that closes every page.
 * `children` lets the Contact page slot its form into the right-hand side.
 */
export default function CtaBand({ children = null }) {
  const { t } = useLang()

  return (
    <section className="bg-yellow text-ink">
      <div className="shell py-14 md:py-20">
        <div
          className={`flex flex-col gap-12 ${
            children ? 'lg:flex-row lg:items-center lg:justify-between lg:gap-16' : ''
          }`}
        >
          <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
            <AnimatedText as="h2" text={t('cta.title')} className="text-display" />
            <Reveal delay={260} className="mb-2">
              <Magnetic strength={0.3}>
                <ArrowButton to="/contact">{t('cta.button')}</ArrowButton>
              </Magnetic>
            </Reveal>
          </div>

          {children ? (
            <Reveal delay={200} className="w-full lg:max-w-[38rem]">
              {children}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
