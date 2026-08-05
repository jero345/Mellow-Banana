/**
 * The two chip styles from the artboards:
 *  - `outline`  → thin stroked capsule (project categories, section numbers)
 *  - `solid`    → white block chip (capability / sector tag rows)
 */
export default function Pill({
  as: Tag = 'span',
  variant = 'outline',
  active = false,
  className = '',
  children,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center whitespace-nowrap text-meta leading-none transition-colors duration-400 ease-brand'

  const styles =
    variant === 'solid'
      ? active
        ? 'bg-yellow text-ink px-2.5 py-1.5'
        : 'bg-white text-ink px-2.5 py-1.5 hover:bg-yellow'
      : active
        ? 'rounded-full border border-yellow bg-yellow text-ink px-4 py-1.5'
        : 'rounded-full border border-hairline px-4 py-1.5 hover:border-white'

  return (
    <Tag className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
