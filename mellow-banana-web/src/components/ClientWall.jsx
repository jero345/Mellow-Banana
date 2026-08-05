import { useMemo, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE, DUR } from '../motion/tokens'
import { useReveal } from '../motion/useReveal'
import { clients } from '../data/site'

const ROWS = 3
/** Seconds per row. Different speeds keep the rows from marching in lockstep. */
const SPEED = [52, 66, 44]

/**
 * The client wall: rows of logos running in alternating directions, each row
 * sliding in from the side it travels towards. Hovering a row pauses it and
 * lifts the logo under the pointer, revealing that client's name.
 *
 * Logos are dealt round-robin into the rows rather than sliced in blocks, so the
 * best-known names stay spread across all three instead of stacking in the first.
 *
 * `invert` themes the black marks white for dark sections.
 */
export default function ClientWall({ invert = false }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const visible = useReveal(ref)

  const rows = useMemo(() => {
    const out = Array.from({ length: ROWS }, () => [])
    clients.forEach((client, i) => out[i % ROWS].push(client))
    return out
  }, [])

  const cell = (client, copy, rowIndex) => (
    <li
      key={`${client.slug}-${copy}`}
      className="cwall__cell"
      // The second copy exists only to make the loop seamless.
      aria-hidden={copy === 1 ? 'true' : undefined}
    >
      <img
        src={`/clients/${client.slug}.png`}
        alt={copy === 0 ? client.name : ''}
        loading={rowIndex === 0 && copy === 0 ? 'eager' : 'lazy'}
        width={260}
        height={100}
        className="cwall__logo"
      />
      <span className="cwall__name">{client.name}</span>
    </li>
  )

  // No movement requested: show every logo at once in a plain grid.
  if (reduced) {
    return (
      <ul ref={ref} className={`cwall--still ${invert ? 'cwall--invert' : ''}`}>
        {clients.map((client) => cell(client, 0, 0))}
      </ul>
    )
  }

  return (
    <div ref={ref} className={invert ? 'cwall--invert' : undefined}>
      {rows.map((row, i) => {
        const backwards = i % 2 === 1
        return (
          <motion.div
            key={i}
            className="cwall__row"
            // Entrance on the row, marquee on the track — different elements,
            // so the two transforms never fight.
            initial={{ opacity: 0, x: backwards ? 70 : -70 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: backwards ? 70 : -70 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: i * 0.14 }}
          >
            <ul
              className="cwall__track"
              style={{
                '--cwall-dur': `${SPEED[i % SPEED.length]}s`,
                '--cwall-dir': backwards ? 'reverse' : 'normal',
              }}
            >
              {[0, 1].map((copy) => row.map((client) => cell(client, copy, i)))}
            </ul>
          </motion.div>
        )
      })}
    </div>
  )
}
