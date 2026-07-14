"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { Eyebrow } from "@/components/ui/atoms"

export function ContactHero() {
  return (
    <section className="relative flex min-h-[60svh] items-center justify-center overflow-hidden pt-24 md:pt-28">
      {/* Animated mesh gradient — T&M palette: champagne, gold, cream, ink-tint */}
      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={["#f3ecdf", "#b08d57", "#f8f3ea", "#e0cfa8", "#d4b896"]}
        speed={0.6}
        backgroundColor="#f3ecdf"
      />

      {/* Soft vignette overlay to push text forward */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(42,37,33,0.18) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 md:py-28">
        <Eyebrow className="text-ink/60">Get In Touch</Eyebrow>

        <h1 className="mt-5 text-balance font-serif text-4xl leading-[1.07] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
          Let&apos;s{" "}
          <span className="italic text-gold">Begin</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-ink/65 sm:text-lg">
          Tell us about the day you&apos;re dreaming of. Every enquiry is read
          personally, and we&apos;ll reply with warmth and honesty.
        </p>

        {/* Gold seam divider */}
        <div className="mx-auto mt-10 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gold/50" />
          <div className="size-1.5 rounded-full bg-gold" />
          <div className="h-px w-12 bg-gold/50" />
        </div>
      </div>
    </section>
  )
}
