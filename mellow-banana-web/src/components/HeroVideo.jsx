import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useTransform } from 'motion/react'

const POSTER = '/media/reel-poster.jpg'

/**
 * The reel running as the hero background: a muted, looping, audio-free cut
 * that fades in over its poster once it can actually play.
 *
 * Falls back to the poster alone when the visitor asks for reduced motion or
 * has Data Saver on, and picks the 720p cut on narrow viewports so phones do
 * not pull the 1080p file.
 *
 * `progress` is the hero's scroll progress: the footage sinks slightly on the
 * way out. There is no scrim or gradient of any kind over the reel — the client
 * wants it exactly as shot.
 */
export default function HeroVideo({ progress }) {
  const videoRef = useRef(null)
  const reduced = useReducedMotion()
  const [src, setSrc] = useState(null)
  const [ready, setReady] = useState(false)

  const videoScale = useTransform(progress ?? null, [0, 1], [1, 1.14])
  const videoY = useTransform(progress ?? null, [0, 1], ['0%', '6%'])
  const drift = reduced || !progress ? {} : { scale: videoScale, y: videoY }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection?.saveData === true
    if (reduced || saveData) return

    const wide = window.matchMedia('(min-width: 1024px)').matches
    setSrc(wide ? '/media/hero-loop-1080.mp4' : '/media/hero-loop-720.mp4')
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    const onReady = () => setReady(true)
    video.addEventListener('canplay', onReady)

    // Some browsers need an explicit nudge even with the autoplay attribute.
    video.play().catch(() => {
      /* Blocked autoplay is fine — the poster stays. */
    })

    return () => video.removeEventListener('canplay', onReady)
  }, [src])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Shown as shot: full colour, no wash — the reel is the hero, not a texture. */}
      <motion.div style={drift} className="absolute inset-0">
        {/* Poster underneath, so there is never a black flash while loading. */}
        <img
          src={POSTER}
          alt=""
          className="absolute inset-0 size-full object-cover"
          fetchPriority="high"
        />

        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            tabIndex={-1}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-brand ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}
      </motion.div>
    </div>
  )
}
