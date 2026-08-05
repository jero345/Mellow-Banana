import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { SPRING } from './tokens'

/**
 * Leans the wrapped element toward the pointer while it hovers, then springs
 * back. `strength` is how far it may travel, as a share of the cursor's offset
 * from centre. Pointer-only: touch devices never fire the hover.
 */
export default function Magnetic({ children, strength = 0.28, className = '', ...rest }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, SPRING.magnet)
  const y = useSpring(my, SPRING.magnet)

  if (reduced) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  const onMove = (event) => {
    if (event.pointerType !== 'mouse') return
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    mx.set((event.clientX - (box.left + box.width / 2)) * strength)
    my.set((event.clientY - (box.top + box.height / 2)) * strength)
  }

  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
