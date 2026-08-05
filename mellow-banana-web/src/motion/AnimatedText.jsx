import { Fragment, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE, DUR } from './tokens'
import { useReveal } from './useReveal'

/**
 * Word-by-word mask reveal: each word sits in its own clipping box and rises
 * into it. Words wrap naturally, so multi-line headlines mask per word without
 * measuring line boxes.
 *
 * `\n` in the text forces a line break, which is how the dictionary encodes the
 * three-line headlines from the artboards.
 *
 * One in-view observer on the container drives every word, so a headline always
 * animates as a single phrase and we are not attaching an observer per word.
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
  const ref = useRef(null)
  const visible = useReveal(ref)
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
    <Tag ref={ref} className={className} {...rest}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi, arr) => {
            const i = index++
            return (
              // The separator is a real text node between the boxes, not inside
              // one: an inline-block trims its own trailing space, which would
              // run the words together for copy-paste and screen readers.
              <Fragment key={`${li}-${wi}`}>
                <span
                  // The clipping box: overflow-hidden with a hair of vertical
                  // padding so descenders are not shaved off.
                  className="inline-block overflow-hidden py-[0.12em] align-bottom"
                  style={{ marginBottom: '-0.12em' }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: '115%' }}
                    animate={visible ? { y: 0 } : { y: '115%' }}
                    transition={{ duration, ease: EASE, delay: delay + i * stagger }}
                  >
                    {word}
                  </motion.span>
                </span>
                {wi < arr.length - 1 ? ' ' : null}
              </Fragment>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
