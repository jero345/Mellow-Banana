import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLocation } from 'react-router-dom'
import { EASE, DUR } from './tokens'
import { Monogram } from '../components/Brand'

/**
 * Route change as a branded shutter: a yellow panel drops down over the
 * outgoing page, then lifts to reveal the incoming one. The panel always
 * enters and leaves through the top edge, so the two halves read as one move.
 *
 * `mode="wait"` keeps the outgoing page on screen until the panel has finished
 * covering, and the incoming page mounts behind it — which is also the moment
 * the scroll resets, so the jump is never visible.
 */

/** Runs on mount, i.e. once the panel is covering the screen. */
function ScrollReset() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])
  return null
}

/** No panel to hide the jump, so just reset on every route change. */
function PlainScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <>
        <PlainScrollReset />
        {children}
      </>
    )
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname}>
        <ScrollReset />
        {children}

        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-90 grid place-items-center bg-yellow"
          // Mounts already covering, lifts away; on exit it drops back down.
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          exit={{ y: '0%' }}
          transition={{ duration: DUR.curtain, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.92 }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ duration: DUR.curtain * 0.7, ease: EASE }}
          >
            <Monogram className="h-12 text-ink md:h-16" />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
