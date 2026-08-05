import { motion, useReducedMotion } from 'motion/react'
import { EASE, DUR, inView } from '../motion/tokens'

/**
 * Quiet fade-and-rise as the element scrolls in — the default for body copy,
 * chip rows and small blocks. Display type uses <AnimatedText> instead.
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  y = 26,
  className = '',
  children,
  ...rest
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  if (reduced) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: DUR.base, ease: EASE, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
