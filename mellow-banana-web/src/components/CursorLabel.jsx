import { useCallback, useRef, useState } from 'react'

const HAND = (
  <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
    <path
      d="M10.5 11V5.6a1.6 1.6 0 0 1 3.2 0V11m0-1.2a1.4 1.4 0 0 1 2.8 0V11m0-.6a1.4 1.4 0 0 1 2.8 0v3.9c0 3.1-2.1 5.7-5.6 5.7-3.3 0-5.4-1.9-6.3-4.3l-1.6-4a1.5 1.5 0 0 1 2.6-1.3l1.1 1.7V5.6"
      fill="#fff"
      stroke="#000"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * Yellow label that tracks the pointer while it is over the wrapped element —
 * the "Ver" badge and the project-name badge shown on the artboards.
 *
 * variant: 'circle' → round "Ver" badge · 'pill' → capsule with the label
 */
export default function CursorLabel({
  label,
  variant = 'circle',
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const badge = useRef(null)
  const frame = useRef(0)
  const [active, setActive] = useState(false)

  const move = useCallback((event) => {
    const host = ref.current
    const el = badge.current
    if (!host || !el) return

    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const box = host.getBoundingClientRect()
      const x = event.clientX - box.left
      const y = event.clientY - box.top
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    })
  }, [])

  const enter = useCallback(
    (event) => {
      setActive(true)
      move(event)
    },
    [move],
  )

  const leave = useCallback(() => {
    cancelAnimationFrame(frame.current)
    setActive(false)
  }, [])

  return (
    <Tag
      ref={ref}
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`relative ${className}`}
      {...rest}
    >
      {children}

      {/* Decorative: the label duplicates the link text that is already here. */}
      <span
        ref={badge}
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-0 z-20 hidden select-none md:block ${
          active ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300 ease-brand`}
      >
        <span
          className={`flex items-center gap-1.5 bg-yellow text-ink ${
            variant === 'circle'
              ? 'size-14 justify-center rounded-full text-meta'
              : 'rounded-full px-4 py-1.5 text-meta whitespace-nowrap'
          } ${active ? 'scale-100' : 'scale-75'} transition-transform duration-400 ease-brand`}
        >
          {label}
          <span className={variant === 'circle' ? 'absolute -right-1 -bottom-1' : 'sr-only'}>
            {variant === 'circle' ? HAND : null}
          </span>
        </span>
      </span>
    </Tag>
  )
}
