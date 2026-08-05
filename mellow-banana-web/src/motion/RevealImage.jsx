import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { EASE, DUR, inView, SPRING } from './tokens'

/** Overscale the picture sits at once settled — this is the headroom the drift moves inside. */
const REST_SCALE = 1.12
/** Drift, as a share of the frame's own height. Must stay under (REST_SCALE - 1) / 2. */
const DRIFT = 4

/**
 * The site's standard way of introducing a picture: the frame unmasks upward
 * while the image inside settles out of an overscale, then drifts against the
 * scroll for depth.
 *
 * The image stays in normal flow so it still defines the frame's height; the
 * drift happens on a wrapper and rides inside the overscale headroom, so no
 * edge is ever exposed. `contain` images are not scaled or drifted — cropping
 * them would defeat the point.
 */
export default function RevealImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  drift = true,
  contain = false,
  delay = 0,
  eager = false,
  ...rest
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const moves = drift && !contain && !reduced

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [`${DRIFT}%`, `${-DRIFT}%`])
  const y = useSpring(rawY, SPRING.parallax)

  const img = (
    <motion.img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      initial={reduced ? false : { scale: contain ? 1 : REST_SCALE + 0.06 }}
      whileInView={reduced ? undefined : { scale: contain ? 1 : REST_SCALE }}
      viewport={inView}
      transition={{ duration: 1.5, ease: EASE, delay }}
      className={`w-full ${contain ? 'object-contain' : 'object-cover'} ${imgClassName}`}
    />
  )

  if (reduced) {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`} {...rest}>
        {img}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={inView}
      transition={{ duration: DUR.slow, ease: EASE, delay }}
      {...rest}
    >
      {moves ? <motion.div style={{ y }}>{img}</motion.div> : img}
    </motion.div>
  )
}
