import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

/** Hairline of yellow across the top, tracking how far down the page you are. */
export default function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-60 h-[2px] origin-left bg-yellow"
      style={{ scaleX }}
    />
  )
}
