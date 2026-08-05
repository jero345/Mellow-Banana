import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { EASE, DUR, SPRING } from './tokens'
import { useReveal } from './useReveal'
import imageSizes from '../data/imageSizes.json'

/** Overscale the picture sits at once settled — this is the headroom the drift moves inside. */
const REST_SCALE = 1.12
/** Drift, as a share of the frame's own height. Must stay under (REST_SCALE - 1) / 2. */
const DRIFT = 4

/**
 * The site's standard way of introducing a picture: the frame unmasks upward
 * while the image inside settles out of an overscale, then drifts against the
 * scroll for depth.
 *
 * The observed box is a plain <div>, not the animating motion component —
 * `useInView` and `useScroll` need a ref on an ordinary element to measure
 * reliably. The mask lives on a motion child inside it.
 *
 * The image stays in normal flow so it still defines the frame's height; the
 * drift rides inside the overscale headroom, so no edge is ever exposed.
 * `contain` images are not scaled or drifted — cropping them would defeat the
 * point.
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
  const visible = useReveal(ref)
  const moves = drift && !contain && !reduced

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [`${DRIFT}%`, `${-DRIFT}%`])
  const y = useSpring(rawY, SPRING.parallax)

  const restScale = contain ? 1 : REST_SCALE

  /*
    Intrinsic size from src/data/imageSizes.json (regenerate it when assets
    change). Without it a figure with no aspect class is 0px tall until it
    loads, and a 0px-tall image never satisfies the browser's lazy-load check —
    so it stays 0px forever and the case study renders empty.
  */
  const size = imageSizes[src?.split('/').pop()]

  const img = (
    <motion.img
      src={src}
      alt={alt}
      width={size?.[0]}
      height={size?.[1]}
      loading={eager ? 'eager' : 'lazy'}
      initial={reduced ? false : { scale: restScale + 0.06 }}
      animate={reduced ? undefined : { scale: visible ? restScale : restScale + 0.06 }}
      transition={{ duration: 1.5, ease: EASE, delay }}
      className={`h-auto w-full ${contain ? 'object-contain' : 'object-cover'} ${imgClassName}`}
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
    <div ref={ref} className={`overflow-hidden ${className}`} {...rest}>
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: visible ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
        transition={{ duration: DUR.slow, ease: EASE, delay }}
      >
        {moves ? <motion.div style={{ y }}>{img}</motion.div> : img}
      </motion.div>
    </div>
  )
}
