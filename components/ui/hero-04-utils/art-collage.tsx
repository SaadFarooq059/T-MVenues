import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Two overlapping frames: a tall primary plate with an offset gold rule,
 * and a smaller secondary plate breaking its lower-left corner.
 */
export function ArtCollage({
  primaryImage,
  secondaryImage,
  primaryAlt = '',
  secondaryAlt = '',
  className,
}: {
  primaryImage: string
  secondaryImage: string
  primaryAlt?: string
  secondaryAlt?: string
  className?: string
}) {
  return (
    <div className={cn('group relative w-full pb-14 pl-5 sm:pb-20 sm:pl-10', className)}>
      <div className="relative">
        <span
          aria-hidden
          className="absolute inset-0 translate-x-3 -translate-y-3 rounded-sm border border-gold/45 sm:translate-x-4 sm:-translate-y-4"
        />
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_18px_60px_rgba(42,37,33,0.18)] sm:aspect-[5/6]">
          <Image
            src={primaryImage}
            alt={primaryAlt}
            fill
            sizes="(max-width: 1024px) 90vw, 44vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-[42%] max-w-[13rem] overflow-hidden rounded-sm border-4 border-cream shadow-[0_14px_44px_rgba(42,37,33,0.24)] sm:max-w-[15rem] sm:border-[6px]">
        <div className="relative aspect-[3/4]">
          <Image
            src={secondaryImage}
            alt={secondaryAlt}
            fill
            sizes="(max-width: 1024px) 42vw, 20vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
