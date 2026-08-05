import { Link } from 'react-router-dom'
import CursorLabel from './CursorLabel'
import { useLang } from '../i18n/useLang'

/**
 * Work-grid / "Más Proyectos" card. The project name rides the cursor, exactly
 * as shown on the artboards.
 */
export default function ProjectCard({ project, ratio = 'aspect-16/10', showMeta = true }) {
  const { f } = useLang()

  return (
    <CursorLabel label={f(project.shortTitle)} variant="pill" as="article">
      <Link to={`/work/${project.slug}`} className="group block">
        <div className="overflow-hidden rounded-xl bg-white/5">
          <img
            src={project.cover}
            alt={f(project.coverAlt)}
            loading="lazy"
            className={`${ratio} w-full object-cover transition-transform duration-1100 ease-brand group-hover:scale-[1.04]`}
          />
        </div>

        {showMeta ? (
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <h3 className="text-body">{f(project.shortTitle)}</h3>
            <p className="text-meta text-white/50">{f(project.sector)}</p>
          </div>
        ) : null}
      </Link>
    </CursorLabel>
  )
}
