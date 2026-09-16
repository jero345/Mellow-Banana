import { Monogram, Wordmark } from './Brand'

/**
 * The strip the page scrolls off to uncover: a yellow band with the giant black
 * wordmark, that sits
 * pinned to the bottom of the viewport, behind everything, and is revealed as
 * the footer slides up over it at the very end of the scroll.
 *
 * `position: sticky; bottom: 0` on the last element in the document keeps it
 * glued to the viewport's bottom edge for the whole scroll. It paints at a
 * negative z-index instead of lifting `<main>` onto its own stacking context:
 * doing that would trap the fixed modals rendered inside the page (the reel)
 * under the header. Everything above it just needs an opaque background.
 */
export default function FooterReveal() {
  return (
    <div aria-hidden="true" className="sticky bottom-0 -z-10 bg-yellow text-ink">
      <div className="shell pt-28 pb-6 md:pt-40 md:pb-8">
        {/* The wordmark is a 10:1 strip — too thin on a phone, so the monogram takes over there. */}
        <Wordmark fluid className="hidden w-full md:block" />
        <Monogram fluid className="mx-auto w-3/4 md:hidden" />
      </div>
    </div>
  )
}
