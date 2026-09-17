import { Link } from 'react-router-dom'

function ArrowGlyph({ className }) {
  return (
    <span
      className={`relative grid size-7 shrink-0 place-items-center overflow-hidden rounded-full border ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-3.5 translate-x-0 transition-transform duration-500 ease-brand group-hover:translate-x-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute size-3.5 -translate-x-6 transition-transform duration-500 ease-brand group-hover:translate-x-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </span>
  )
}

const TONES = {
  /* Black capsule with a yellow arrow — for the yellow sections. */
  ink: {
    shell: 'bg-ink text-white hover:bg-[#151515]',
    glyph: 'border-yellow text-yellow',
  },
  /* Yellow capsule with a black arrow — for the dark footer. */
  yellow: {
    shell: 'bg-yellow text-ink hover:bg-white',
    glyph: 'border-ink text-ink',
  },
}

/**
 * The signature pill button: a capsule, label, and an arrow that slides
 * through its own circle on hover. Renders as a Link, an <a> or a <button>
 * depending on which prop is supplied. `tone` picks the colourway.
 */
export default function ArrowButton({ to, href, children, className = '', tone = 'ink', ...rest }) {
  const colours = TONES[tone]
  const shell =
    'group inline-flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-6 text-meta ' +
    `transition-colors duration-500 ease-brand ${colours.shell} ` +
    className

  const inner = (
    <>
      <span>{children}</span>
      <ArrowGlyph className={colours.glyph} />
    </>
  )

  if (to) {
    return (
      <Link to={to} className={shell} {...rest}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={shell} {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" className={shell} {...rest}>
      {inner}
    </button>
  )
}
