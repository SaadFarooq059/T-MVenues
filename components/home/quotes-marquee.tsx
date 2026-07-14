'use client'

const quotes = [
  {
    text: 'The best thing to hold onto in life is each other.',
    attribution: 'Audrey Hepburn',
  },
  {
    text: 'Grow old along with me! The best is yet to be.',
    attribution: 'Robert Browning',
  },
  {
    text: 'A successful marriage requires falling in love many times, always with the same person.',
    attribution: 'Mignon McLaughlin',
  },
  {
    text: 'To love and be loved is to feel the sun from both sides.',
    attribution: 'David Viscott',
  },
  {
    text: 'We loved with a love that was more than love.',
    attribution: 'Edgar Allan Poe',
  },
  {
    text: 'Where there is love there is life.',
    attribution: 'Mahatma Gandhi',
  },
  {
    text: 'Love is composed of a single soul inhabiting two bodies.',
    attribution: 'Aristotle',
  },
  {
    text: 'Happily ever after is not a fairy tale — it is a choice.',
    attribution: 'Unknown',
  },
]

function QuoteCard({ quote }: { quote: (typeof quotes)[number] }) {
  return (
    <div className="flex shrink-0 items-center gap-5 px-5 md:gap-8 md:px-8">
      <div className="flex shrink-0 items-center gap-2" aria-hidden="true">
        <span className="h-px w-6 bg-gold/40 md:w-8" />
        <span className="size-1.5 rotate-45 bg-gold/50" />
        <span className="h-px w-6 bg-gold/40 md:w-8" />
      </div>
      <p className="whitespace-nowrap font-serif text-base italic leading-snug text-ink/80 md:text-xl">
        &ldquo;{quote.text}&rdquo;
      </p>
      <span className="h-7 w-px shrink-0 bg-gold/30" aria-hidden="true" />
      <span className="whitespace-nowrap text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-[0.7rem]">
        {quote.attribution}
      </span>
    </div>
  )
}

function QuoteRow({
  items,
  direction,
}: {
  items: typeof quotes
  direction: 'left' | 'right'
}) {
  const doubled = [...items, ...items]

  return (
    <div
      className={
        direction === 'left'
          ? 'quote-marquee-track'
          : 'quote-marquee-track-reverse mt-6'
      }
    >
      {doubled.map((quote, i) => (
        <QuoteCard key={`${quote.attribution}-${i}`} quote={quote} />
      ))}
    </div>
  )
}

export function QuotesMarquee() {
  const reversed = [...quotes].reverse()

  return (
    <section
      className="relative overflow-hidden border-y border-gold/25 bg-champagne py-12 md:py-14"
      aria-label="Marriage quotes"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-champagne to-transparent sm:w-24 md:w-44"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-champagne to-transparent sm:w-24 md:w-44"
        aria-hidden="true"
      />

      <QuoteRow items={quotes} direction="left" />
      <QuoteRow items={reversed} direction="right" />
    </section>
  )
}
