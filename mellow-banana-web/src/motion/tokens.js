/**
 * Motion tokens. Everything on the site animates from this vocabulary so the
 * whole thing moves like one object rather than a pile of separate effects.
 *
 * `EASE` is the same curve as the CSS `--ease-brand` token.
 */

export const EASE = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT = [0.65, 0, 0.35, 1]

export const DUR = {
  fast: 0.45,
  base: 0.8,
  slow: 1.15,
  curtain: 0.75,
}

/** Word-by-word mask reveal — the default for display and title type. */
export const maskWord = {
  hidden: { y: '110%' },
  visible: (i = 0) => ({
    y: 0,
    transition: { duration: DUR.base, ease: EASE, delay: i * 0.055 },
  }),
}

/** Quiet fade-and-rise, for body copy and small UI. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE, delay: i * 0.08 },
  }),
}

/** Images unmask upward while the picture inside settles out of an overscale. */
export const clipUp = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: DUR.slow, ease: EASE } },
}

export const scaleSettle = {
  hidden: { scale: 1.18 },
  visible: { scale: 1, transition: { duration: 1.4, ease: EASE } },
}

/** Parent that hands an index down to children for stagger. */
export const group = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

/** Springs used by the pointer-driven pieces. */
export const SPRING = {
  magnet: { stiffness: 220, damping: 22, mass: 0.6 },
  cursor: { stiffness: 380, damping: 32, mass: 0.4 },
  parallax: { stiffness: 90, damping: 26, mass: 0.4 },
}
