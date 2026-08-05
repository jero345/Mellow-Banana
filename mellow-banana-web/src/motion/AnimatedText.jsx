import { motion, useReducedMotion } from 'motion/react'
import { EASE, DUR, inView } from './tokens'

/**
 * Word-by-word mask reveal: each word sits in its own clipping box and rises
 * into it. Words wrap naturally, so multi-line headlines mask per word without
 * measuring line boxes.
 *
 * `\n` in the text forces a line break, which is how the dictionary encodes the
 * three-line headlines from the artboards.
 */
export default function AnimatedText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.055,
  duration = DUR.base,
  ...rest
}) {
  const reduced = useReducedMotion()
  const lines = String(text ?? '').split('\n')

  if (reduced) {
    return (
      <Tag className={className} {...rest}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    )
  }

  let index = 0

  return (
    <Tag className={className} {...rest}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi, arr) => {
            const i = index++
            return (
              <span
                key={`${li}-${wi}`}
                // The clipping box: overflow-hidden with a hair of vertical
                // padding so descenders are not shaved off.
                className="inline-block overflow-hidden py-[0.12em] align-bottom"
                style={{ marginBottom: '-0.12em' }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: '115%' }}
                  whileInView={{ y: 0 }}
                  viewport={inView}
                  transition={{ duration, ease: EASE, delay: delay + i * stagger }}
                >
                  {word}
                  {wi < arr.length - 1 ? ' ' : null}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
