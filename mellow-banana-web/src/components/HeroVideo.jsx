import { useEffect, useRef, useState } from 'react'

const POSTER = '/media/reel-poster.jpg'

/**
 * The reel running as the hero background: a muted, looping, audio-free cut
 * that fades in over its poster once it can actually play.
 *
 * Falls back to the poster alone when the visitor asks for reduced motion or
 * has Data Saver on, and picks the 720p cut on narrow viewports so phones do
 * not pull the 1080p file.
 */
export default function HeroVideo() {
  const videoRef = useRef(null)
  const [src, setSrc] = useState(null)
  const [ready, setReady] = useState(false)

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

      {/*
        Scrim. The headline is yellow on the artboard's pure black, so the
        footage is pushed well down: a flat wash, a left-weighted gradient
        behind the type, and a fade into the section that follows.
      */}
      <div className="absolute inset-0 bg-ink/72" />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.34)_70%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_bottom,transparent_0%,#000_92%)]" />
    </div>
  )
}
