import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { EASE, SPRING } from '../motion/tokens'

/** Where the orb waits before the pointer reaches the hero — the artboard spot. */
const REST = { x: 0.46, y: 0.5 }

/**
 * True when the visitor has a real pointer and has not asked for less motion,
 * i.e. when the orb can behave as a cursor instead of a fixed button.
 */
export function useFinePointer() {
  const reduced = useReducedMotion()
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setFine(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return fine && !reduced
}

/** The disc itself — shared by the pointer-driven orb and the static button. */
function Disc({ label, className = '' }) {
  const reduced = useReducedMotion()

  return (
    <span className={`relative grid size-25 place-items-center rounded-full ${className}`}>
      {/* Semi-transparent so the reel keeps reading through it, as on the artboard. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-white/12 bg-[radial-gradient(circle_at_35%_28%,rgba(48,48,42,0.66)_0%,rgba(12,12,10,0.78)_58%,rgba(0,0,0,0.84)_100%)] shadow-[inset_0_0_34px_rgba(255,241,3,0.10),0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
      />
      {/* Ring breathing outward, like a play indicator at rest. */}
      <motion.span
        aria-hidden="true"
        animate={reduced ? undefined : { scale: [1, 1.28], opacity: [0.45, 0] }}
        transition={{ duration: 3.4, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.8 }}
        className="absolute inset-0 rounded-full border border-yellow/40"
      />
      <span className="relative text-meta font-light text-white">{label}</span>
    </span>
  )
}

/**
 * Play Reel orb, jkrglobal-style: on pointer devices the whole hero is the
 * trigger and the orb rides the cursor across it, drifting on its own while it
 * waits. Touch and reduced-motion visitors get <StaticReelButton /> instead.
 *
 * `hostRef` is the hero section; the orb is positioned inside it, so it is
 * clipped by the hero and scrolls away with it.
 */
export default function ReelOrb({ hostRef, onPlay, label }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, SPRING.cursor)
  const y = useSpring(my, SPRING.cursor)
  const inside = useRef(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const rest = () => {
      const box = host.getBoundingClientRect()
      mx.set(box.width * REST.x)
      my.set(box.height * REST.y)
    }

    // Sit at the resting spot until the pointer actually arrives.
    rest()

    const onMove = (event) => {
      if (event.pointerType !== 'mouse') return
      const box = host.getBoundingClientRect()
      inside.current = true
      mx.set(event.clientX - box.left)
      my.set(event.clientY - box.top)
    }

    const onLeave = () => {
      inside.current = false
      rest()
    }

    const onResize = () => {
      if (!inside.current) rest()
    }

    host.addEventListener('pointermove', onMove, { passive: true })
    host.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', onResize)

    return () => {
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [hostRef, mx, my])

  return (
    <>
      {/* The whole hero is one big play button. */}
      <button
        type="button"
        onClick={onPlay}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        aria-label={label}
        data-cursor-hidden
        className="absolute inset-0 z-10 cursor-none"
      />

      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
        className="pointer-events-none absolute top-0 left-0 z-30"
      >
        {/* Slow wander, so it is never completely still even when parked. */}
        <motion.div
          animate={{ x: [0, 9, -6, 0], y: [0, -7, 6, 0] }}
          transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity }}
        >
          <Disc
            label={label}
            className={`-translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-brand ${
              pressed ? 'scale-90' : 'scale-100'
            }`}
          />
        </motion.div>
      </motion.div>
    </>
  )
}

/** Touch / reduced-motion fallback: the same disc, as a plain button in flow. */
export function StaticReelButton({ onPlay, label }) {
  return (
    <button type="button" onClick={onPlay} className="group rounded-full">
      <Disc label={label} className="transition-transform duration-500 ease-brand group-active:scale-95" />
    </button>
  )
}
