import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CursorLabel from './CursorLabel'
import { useLang } from '../i18n/useLang'

function ArrowCircle({ dir, onClick, label, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full bg-yellow text-ink transition-all duration-500 ease-brand hover:scale-110 disabled:pointer-events-none disabled:opacity-25"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`size-5 ${dir === 'prev' ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </button>
  )
}

/**
 * Centre-snapping project slider. Native scroll-snap does the heavy lifting so
 * touch drag and keyboard scrolling work for free; the arrows and the
 * desaturated neighbours are layered on top.
 */
export default function ProjectCarousel({ items }) {
  const { t, f } = useLang()
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  const syncIndex = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const centre = track.scrollLeft + track.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    Array.from(track.children).forEach((child, i) => {
      const mid = child.offsetLeft + child.offsetWidth / 2
      const dist = Math.abs(mid - centre)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    setIndex(best)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(syncIndex)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    syncIndex()
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
    }
  }, [syncIndex])

  const go = useCallback((delta) => {
    const track = trackRef.current
    if (!track) return
    const target = track.children[
      Math.min(track.children.length - 1, Math.max(0, index + delta))
    ]
    if (!target) return
    track.scrollTo({
      left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [index])

  const active = items[index]

  return (
    <div className="relative">
      {/*
        Side padding is exactly (100% - slide width) / 2 so the first and last
        slides can sit dead centre: 76vw slides → 12vw, 62vw slides → 19vw.
      */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-[12vw] pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-4 md:px-[19vw] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((project, i) => {
          const isActive = i === index
          return (
            <CursorLabel
              key={project.slug}
              label={t('home.work.hover')}
              variant="circle"
              className={`w-[76vw] shrink-0 snap-center transition-all duration-700 ease-brand md:w-[62vw] ${
                isActive ? 'opacity-100' : 'opacity-45 grayscale'
              }`}
            >
              <Link
                to={`/work/${project.slug}`}
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
                className="block overflow-hidden rounded-xl"
              >
                <img
                  src={project.cover}
                  alt={f(project.coverAlt)}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  className="aspect-16/10 w-full object-cover transition-transform duration-1200 ease-brand hover:scale-[1.03]"
                />
              </Link>
            </CursorLabel>
          )
        })}
      </div>

      {/* Arrows straddle the seam between the centre slide and its neighbours. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-8 hidden items-center md:flex">
        <div className="pointer-events-auto absolute left-[calc(19vw-1.375rem)]">
          <ArrowCircle
            dir="prev"
            onClick={() => go(-1)}
            label={t('home.work.prev')}
            disabled={index === 0}
          />
        </div>
        <div className="pointer-events-auto absolute right-[calc(19vw-1.375rem)]">
          <ArrowCircle
            dir="next"
            onClick={() => go(1)}
            label={t('home.work.next')}
            disabled={index === items.length - 1}
          />
        </div>
      </div>

      {/* Caption for the centred project. */}
      <div className="shell mt-6 flex flex-wrap items-baseline justify-between gap-4">
        <p aria-live="polite" className="text-body text-white/85">
          {f(active?.shortTitle)}
        </p>
        <Link to="/work" className="link-underline text-body text-yellow">
          {t('home.work.more')}
        </Link>
      </div>
    </div>
  )
}
