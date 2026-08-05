import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLocation } from 'react-router-dom'
import { EASE, DUR } from './tokens'
import { Monogram } from '../components/Brand'

/**
 * Route change as a branded shutter: a yellow panel drops down over the
 * outgoing page, then lifts to reveal the incoming one, always travelling
 * through the top edge so the two halves read as one move.
 *
 * Only the panel lives inside <AnimatePresence>; the page content is a sibling.
 * Keeping the routes out of it matters: `AnimatePresence initial={false}` makes
 * its whole subtree skip entry animations on first render, which silently
 * disabled every scroll reveal on a fresh load and hid the real bug.
 */
function ScrollReset() {
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
        <ScrollReset />
        {children}
      </>
    )
  }

  return (
    <>
      <ScrollReset />
      {children}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
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
      </AnimatePresence>
    </>
  )
}
