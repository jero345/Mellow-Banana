import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/useLang'

export default function ReelModal({ open, onClose }) {
  const { t } = useLang()
  const videoRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const video = videoRef.current
    video?.play().catch(() => {
      /* Autoplay with sound can be blocked — the native controls remain. */
    })

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Reel"
      className="fixed inset-0 z-100 grid place-items-center bg-ink/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t('reel.close')}
        className="absolute top-6 right-6 grid size-11 place-items-center rounded-full border border-hairline text-white transition-colors duration-400 hover:border-yellow hover:text-yellow"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src="/media/reel.mp4"
        poster="/media/reel-poster.jpg"
        controls
        playsInline
        preload="metadata"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[86vh] w-full max-w-7xl rounded-xl bg-black"
      />
    </div>
  )
}
