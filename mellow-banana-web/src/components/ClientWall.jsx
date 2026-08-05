import { clientHalves, clientNames } from '../data/site'

/**
 * The client wall, exactly as laid out on the artboards: two artwork halves
 * side by side make one two-row band, and the band repeats with the halves
 * swapped.
 *
 * The artwork is flat-black marks on a transparent ground, so light sections
 * use it as-is and dark sections pass `invert` to flip the marks to white.
 */
export default function ClientWall({ invert = false }) {
  const [left, right] = clientHalves
  const bands = [
    [left, right],
    [right, left],
  ]

  return (
    <div
      className="flex flex-col gap-6 md:gap-10"
      role="img"
      aria-label={`Clientes: ${clientNames.join(', ')}`}
    >
      {bands.map((band, i) => (
        <div key={i} className="grid grid-cols-2 items-center gap-4 md:gap-10">
          {band.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className={`h-auto w-full ${invert ? 'invert' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
