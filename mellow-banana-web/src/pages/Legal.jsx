import { useLang } from '../i18n/useLang'

/**
 * Privacy / cookies / terms. One page for the three, keyed by `kind`, showing
 * a placeholder until the client sends the actual texts.
 */
export default function Legal({ kind }) {
  const { t } = useLang()

  return (
    <section className="shell pt-32 pb-24 md:pt-40 md:pb-32">
      <h1 className="text-title">{t(`footer.${kind}`)}</h1>
      <p className="mt-8 max-w-[52ch] text-body text-white/70">{t('legal.soon')}</p>
    </section>
  )
}
