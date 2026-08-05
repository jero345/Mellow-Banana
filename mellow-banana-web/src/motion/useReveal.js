import { useInView } from 'motion/react'

/**
 * Single source of truth for "has this scrolled into view yet".
 *
 * Deliberately the `useInView` hook rather than the `whileInView` prop: in
 * motion 13 the in-view gesture is not part of the ESM build that Vite
 * consumes, so `whileInView` is accepted and silently does nothing — elements
 * stay at their `initial` value, which for a masked reveal means invisible.
 * The hook is real code we can see run.
 *
 * Margin is in pixels on purpose; percentage rootMargin is not reliably
 * supported when the root is the viewport.
 */
export const REVEAL_VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -40px 0px' }

export function useReveal(ref, options = REVEAL_VIEWPORT) {
  return useInView(ref, options)
}
