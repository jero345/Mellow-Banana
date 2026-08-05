import Reveal from './Reveal'
import RevealImage from '../motion/RevealImage'
import { useLang } from '../i18n/useLang'

/**
 * Renders one entry of a project's `blocks` array. Keeping the layouts here
 * means a new case study is data, not markup.
 *
 * Each figure unmasks and drifts on its own timing, so a row of images arrives
 * as a sequence rather than as one block.
 */

function Figure({ item, className = '', contain = false, delay = 0 }) {
  const { f } = useLang()
  return (
    <RevealImage
      src={item.src}
      alt={f(item.alt)}
      contain={contain}
      delay={delay}
      className={`rounded-xl bg-white/5 ${className}`}
    />
  )
}

export default function CaseBlock({ block }) {
  const { f } = useLang()

  switch (block.kind) {
    case 'text':
      return (
        <section className="shell py-12 md:py-16">
          <div className="max-w-[58ch] space-y-6">
            {block.copy.map((para, i) => (
              <Reveal key={i} delay={i * 130}>
                <p className="text-body text-white/85">{f(para)}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )

    case 'full':
      return (
        <div className="shell py-3 md:py-4">
          <Figure item={block} contain={block.contain} />
        </div>
      )

    case 'duo':
      return (
        <div className="shell grid gap-3 py-3 md:grid-cols-2 md:gap-4 md:py-4">
          {block.items.map((item, i) => (
            <Figure key={item.src} item={item} delay={i * 0.12} />
          ))}
        </div>
      )

    case 'split':
      return (
        <div className="shell grid gap-3 py-3 md:grid-cols-3 md:gap-4 md:py-4">
          <Figure item={block.items[0]} className="md:col-span-2" />
          <Figure item={block.items[1]} delay={0.14} />
        </div>
      )

    case 'trio':
      return (
        <div className="shell grid gap-3 py-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 md:py-4">
          {block.items.map((item, i) => (
            <Figure key={item.src} item={item} delay={i * 0.1} />
          ))}
        </div>
      )

    default:
      return null
  }
}
