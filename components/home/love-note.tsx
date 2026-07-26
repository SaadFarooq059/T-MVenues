import Image from 'next/image'
import { Reveal } from '@/components/motion/reveal'

const images = [
  {
    src: '/images/gallery-1.png',
    alt: 'Ceremony aisle lined with florals leading to a floral arch',
    className:
      'left-[2%] top-[4%] h-56 w-40 lg:h-72 lg:w-52',
  },
  {
    src: '/images/gallery-2.png',
    alt: 'Elegant wedding place setting with gold cutlery and a floral posy',
    className:
      'bottom-[12%] left-[10%] h-36 w-36 lg:h-44 lg:w-44',
  },
  {
    src: '/images/gallery-5.png',
    alt: 'Styled vignette with draped fabric, vintage furniture and florals',
    className:
      'right-[8%] top-[8%] h-32 w-32 lg:h-40 lg:w-40',
  },
  {
    src: '/images/gallery-7.png',
    alt: 'Lush floral centrepiece with candlelight and gold accents',
    className:
      'bottom-[6%] right-[4%] h-56 w-40 lg:h-72 lg:w-52',
  },
]

function GoldBloom({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M24 6c1.2 6.8 4.2 11.2 9 14-4.8 2.8-7.8 7.2-9 14-1.2-6.8-4.2-11.2-9-14 4.8-2.8 7.8-7.2 9-14Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M24 18v18"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M18 28c2.5 1.2 4.5 1.8 6 1.8s3.5-.6 6-1.8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Editorial “love note” — centred quote framed by floating venue photographs.
 * Layout inspired by romantic editorial grids; palette & type are T&M brand.
 */
export function LoveNote() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28 lg:py-32">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 md:min-h-[40rem] lg:min-h-[44rem]">
        {/* Floating photos — desktop / tablet composition */}
        {images.map((image, i) => (
          <Reveal
            key={image.src}
            delay={0.08 + i * 0.06}
            className={`group absolute z-20 hidden md:block ${image.className}`}
          >
            <div className="relative h-full w-full overflow-hidden shadow-[0_12px_40px_rgba(42,37,33,0.12)] transition-all duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:shadow-[0_20px_48px_rgba(42,37,33,0.2)]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="22vw"
                quality={90}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        ))}

        {/* Mobile photo strip */}
        <div className="mb-10 grid grid-cols-2 gap-3 md:hidden">
          {images.slice(0, 4).map((image) => (
            <div
              key={`m-${image.src}`}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="45vw"
                quality={90}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Centre copy */}
        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center justify-center px-4 text-center md:absolute md:inset-0 md:min-h-[40rem] lg:min-h-[44rem]">
          <Reveal>
            <p className="font-serif text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-[1.2] tracking-tight text-ink">
              <span className="text-gold" aria-hidden="true">
                &ldquo;
              </span>
              Every room tells a love story — we simply help it speak.
              <span className="text-gold" aria-hidden="true">
                &rdquo;
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-md text-pretty text-sm leading-relaxed text-ink/65 sm:text-base">
              From the soft fall of silk to the glow of candlelight, we dress
              venues with warmth and quiet intention — so the space feels as
              considered as the moment itself.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <GoldBloom className="mt-8 size-10 text-gold md:mt-10 md:size-12" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
