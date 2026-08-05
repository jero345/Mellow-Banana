import { Link } from 'react-router-dom'

function ArrowGlyph() {
  return (
    <span className="relative grid size-7 shrink-0 place-items-center overflow-hidden rounded-full border border-yellow">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-3.5 translate-x-0 text-yellow transition-transform duration-500 ease-brand group-hover:translate-x-6"
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
        className="absolute size-3.5 -translate-x-6 text-yellow transition-transform duration-500 ease-brand group-hover:translate-x-0"
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

/**
 * The signature pill button: black capsule, label, and an arrow that slides
 * through its own circle on hover. Renders as a Link, an <a> or a <button>
 * depending on which prop is supplied.
 */
export default function ArrowButton({ to, href, children, className = '', ...rest }) {
  const shell =
    'group inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-6 text-meta ' +
    'text-white transition-colors duration-500 ease-brand hover:bg-[#151515] ' +
    className

  const inner = (
    <>
      <span>{children}</span>
      <ArrowGlyph />
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
