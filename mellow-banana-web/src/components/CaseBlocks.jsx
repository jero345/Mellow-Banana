import Reveal from './Reveal'
import { useLang } from '../i18n/useLang'

/**
 * Renders one entry of a project's `blocks` array. Keeping the layouts here
 * means a new case study is data, not markup.
 */

function Figure({ item, className = '', contain = false }) {
  const { f } = useLang()
  return (
    <div className={`overflow-hidden rounded-xl bg-white/5 ${className}`}>
      <img
        src={item.src}
        alt={f(item.alt)}
        loading="lazy"
        className={`w-full ${contain ? 'object-contain' : 'object-cover'}`}
      />
    </div>
  )
}

export default function CaseBlock({ block }) {
  const { f } = useLang()

  switch (block.kind) {
    case 'text':
      return (
        <Reveal className="shell py-12 md:py-16">
          <div className="max-w-[58ch] space-y-6">
            {block.copy.map((para, i) => (
              <p key={i} className="text-body text-white/85">
                {f(para)}
              </p>
            ))}
          </div>
        </Reveal>
      )

    case 'full':
      return (
        <Reveal className="shell py-3 md:py-4">
          <Figure item={block} contain={block.contain} />
        </Reveal>
      )

    case 'duo':
      return (
        <Reveal className="shell grid gap-3 py-3 md:grid-cols-2 md:gap-4 md:py-4">
          {block.items.map((item) => (
            <Figure key={item.src} item={item} />
          ))}
        </Reveal>
      )

    case 'split':
      return (
        <Reveal className="shell grid gap-3 py-3 md:grid-cols-3 md:gap-4 md:py-4">
          <Figure item={block.items[0]} className="md:col-span-2" />
          <Figure item={block.items[1]} />
        </Reveal>
      )

    case 'trio':
      return (
        <Reveal className="shell grid gap-3 py-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 md:py-4">
          {block.items.map((item) => (
            <Figure key={item.src} item={item} />
          ))}
        </Reveal>
      )

    default:
      return null
  }
}
