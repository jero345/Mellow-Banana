import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { SPRING } from './tokens'

/**
 * A small yellow ring that trails the pointer and swells over anything
 * interactive. Mouse-only and purely decorative — the native cursor stays
 * visible underneath, so nothing depends on this to be usable.
 *
 * One document-level listener drives it, and hover state comes from
 * `closest()` on the event target rather than per-element handlers.
 */
const INTERACTIVE = 'a, button, input, textarea, select, [role="button"]'

export default function Cursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hot, setHot] = useState(false)
  const [visible, setVisible] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const x = useSpring(mx, SPRING.cursor)
  const y = useSpring(my, SPRING.cursor)

  useEffect(() => {
    if (reduced) return
    // Only on devices with a real pointer.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)

    const onMove = (event) => {
      mx.set(event.clientX)
      my.set(event.clientY)
      setVisible(true)
      setHot(!!event.target?.closest?.(INTERACTIVE))
    }
    const onLeave = () => setVisible(false)

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced, mx, my])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-95 mix-blend-difference"
      style={{ x, y }}
    >
      <motion.span
        className="block rounded-full border border-yellow"
        animate={{
          width: hot ? 44 : 18,
          height: hot ? 44 : 18,
          opacity: visible ? (hot ? 0.9 : 0.55) : 0,
          x: hot ? -22 : -9,
          y: hot ? -22 : -9,
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}
