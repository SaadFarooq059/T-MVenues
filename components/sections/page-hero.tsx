import { Eyebrow, SeamDivider } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'

/**
 * Shared header block for inner pages. Sits below the fixed header
 * (pt-24 / md:pt-28 account for the taller logo bar) on a warm ink background.
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
    <section className="bg-ink pt-24 text-champagne md:pt-28">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 md:py-28">
        <Reveal>
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 text-balance font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
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
