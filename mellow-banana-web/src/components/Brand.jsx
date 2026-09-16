import wordmarkSvg from '../brand/wordmark.svg?raw'
import monogramSvg from '../brand/monogram.svg?raw'

/**
 * The wordmark and monogram are the original vector outlines lifted from the
 * brand artboard, inlined so they inherit `currentColor`.
 *
 * By default the mark is sized by height (`h-*` on the wrapper); `fluid` sizes
 * it by width instead, for the giant footer wordmark.
 */

function InlineSvg({ markup, className, label, fluid }) {
  return (
    <span
      className={`block ${fluid ? '[&>svg]:h-auto [&>svg]:w-full' : '[&>svg]:h-full [&>svg]:w-auto'} ${className}`}
      role="img"
      aria-label={label}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

export function Wordmark({ className = '', fluid = false }) {
  return <InlineSvg markup={wordmarkSvg} label="Mellow & Banana" className={className} fluid={fluid} />
}

export function Monogram({ className = '', fluid = false }) {
  return <InlineSvg markup={monogramSvg} label="M&B." className={className} fluid={fluid} />
}
