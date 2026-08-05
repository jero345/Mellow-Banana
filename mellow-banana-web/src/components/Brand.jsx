import wordmarkSvg from '../brand/wordmark.svg?raw'
import monogramSvg from '../brand/monogram.svg?raw'

/**
 * The wordmark and monogram are the original vector outlines lifted from the
 * brand artboard, inlined so they inherit `currentColor`.
 */

function InlineSvg({ markup, className, label }) {
  return (
    <span
      className={className}
      role="img"
      aria-label={label}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

export function Wordmark({ className = '' }) {
  return (
    <InlineSvg
      markup={wordmarkSvg}
      label="Mellow & Banana"
      className={`block [&>svg]:h-full [&>svg]:w-auto ${className}`}
    />
  )
}

export function Monogram({ className = '' }) {
  return (
    <InlineSvg
      markup={monogramSvg}
      label="M&B."
      className={`block [&>svg]:h-full [&>svg]:w-auto ${className}`}
    />
  )
}
