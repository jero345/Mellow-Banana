/** The outlined "01 …05" capsule that opens each About section. */
export default function SectionNumber({ children }) {
  return (
    <span className="inline-flex min-w-16 items-center rounded-full border border-yellow px-3 py-1 text-meta leading-none text-yellow">
      {children}
    </span>
  )
}
