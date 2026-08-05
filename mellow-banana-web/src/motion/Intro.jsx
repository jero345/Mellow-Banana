import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { EASE } from './tokens'
import { Wordmark } from '../components/Brand'

const SEEN_KEY = 'mb-intro-seen'

/**
 * First-load curtain: the wordmark wipes in over black, holds, then the panel
 * lifts into the hero. Shown once per session — a returning visitor gets
 * straight to the page — and skipped entirely for reduced motion.
 *
 * It also buys the hero video and the four brand faces a moment to arrive.
 */
export default function Intro() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.sessionStorage.getItem(SEEN_KEY) !== '1'
  })

  useEffect(() => {
    if (!open || reduced) {
      setOpen(false)
      return
    }

    window.sessionStorage.setItem(SEEN_KEY, '1')
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => setOpen(false), 1750)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [open, reduced])

  if (reduced) return null

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-100 grid place-items-center bg-ink"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: EASE }}
          onAnimationComplete={() => {
            document.body.style.overflow = ''
          }}
        >
          {/* The wordmark wipes in left-to-right, then eases out as the panel lifts. */}
          <motion.div
            initial={{ clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            transition={{ duration: 1.05, ease: EASE, delay: 0.12 }}
          >
            <Wordmark className="h-5 text-yellow sm:h-7 md:h-9" />
          </motion.div>

          {/* Hairline that draws under the mark. */}
          <motion.div
            className="absolute bottom-[38%] h-px bg-yellow/45"
            initial={{ width: 0 }}
            animate={{ width: 'min(42vw, 22rem)' }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
