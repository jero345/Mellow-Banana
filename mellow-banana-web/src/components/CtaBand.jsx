import ArrowButton from './ArrowButton'
import WhatsappButton from './WhatsappButton'
import Reveal from './Reveal'
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
          <Reveal className="flex flex-wrap items-end gap-x-6 gap-y-4">
            <h2 className="text-display whitespace-pre-line">{t('cta.title')}</h2>
            <ArrowButton to="/contact" className="mb-2">
              {t('cta.button')}
            </ArrowButton>
          </Reveal>

          {children ? (
            <Reveal delay={120} className="w-full lg:max-w-[38rem]">
              {children}
            </Reveal>
          ) : null}
        </div>

        {!children ? (
          <div className="mt-10 flex justify-end md:-mt-10">
            <WhatsappButton />
          </div>
        ) : null}
      </div>
    </section>
  )
}
