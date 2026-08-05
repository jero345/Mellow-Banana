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
 * `progress` is the hero's scroll progress: the footage sinks and the scrim
 * closes over it on the way out, so the hand-off into the black page below
 * feels like one continuous move.
 */
export default function HeroVideo({ progress }) {
  const videoRef = useRef(null)
  const reduced = useReducedMotion()
  const [src, setSrc] = useState(null)
  const [ready, setReady] = useState(false)

  const videoScale = useTransform(progress ?? null, [0, 1], [1, 1.14])
  const videoY = useTransform(progress ?? null, [0, 1], ['0%', '6%'])
  const scrimOpacity = useTransform(progress ?? null, [0, 1], [1, 2.1])
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
      {/*
        Held back and largely desaturated so the palette stays black + yellow:
        the reel reads as texture behind the type, not as a second colour scheme.
      */}
      <motion.div
        style={drift}
        className="absolute inset-0 brightness-[0.82] contrast-[1.06] saturate-[0.72]"
      >
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

      {/*
        Scrim: a light flat wash, a gradient weighted to the left so the yellow
        headline always has a dark ground, and a fade into the black section
        that follows. Tuned against the brightest frame of the reel.
      */}
      <motion.div
        style={reduced || !progress ? {} : { opacity: scrimOpacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.5)_34%,rgba(0,0,0,0.12)_62%,rgba(0,0,0,0.4)_100%)]" />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_bottom,transparent_0%,#000_94%)]" />
    </div>
  )
}
