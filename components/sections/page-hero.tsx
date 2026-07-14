import { Eyebrow, SeamDivider } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'

/**
 * Shared header block for inner pages. Sits below the fixed 80px header
 * (pt-20 accounts for it) on a warm ink background.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <section className="bg-ink pt-20 text-champagne">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <Reveal>
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 text-balance font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-champagne/70">
              {intro}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.3}>
          <SeamDivider className="mt-8" />
        </Reveal>
      </div>
    </section>
  )
}
