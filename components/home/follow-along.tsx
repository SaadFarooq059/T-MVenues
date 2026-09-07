'use client'

import Link from 'next/link'
import InteractiveBentoGallery, {
  type BentoMediaItem,
} from '@/components/ui/interactive-bento-gallery'
import { Eyebrow } from '@/components/ui/atoms'
import { siteMeta } from '@/lib/content'
import { Reveal } from '@/components/motion/reveal'
import type { SocialMediaItem, SocialMediaSpan } from '@/lib/contentful'

const SPAN_CLASSES: Record<SocialMediaSpan, string> = {
  tall: 'col-span-1 row-span-2 sm:row-span-3',
  wide: 'col-span-1 row-span-2 sm:col-span-2 sm:row-span-2',
  feature: 'col-span-2 row-span-2 sm:col-span-1 sm:row-span-3',
}

function toBentoItems(items: SocialMediaItem[]): BentoMediaItem[] {
  return items.map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    desc: item.desc,
    url: item.url,
    span: SPAN_CLASSES[item.span],
  }))
}

/**
 * Home social mosaic — Contentful-driven bento of photos & clips,
 * with Instagram / TikTok links beneath.
 */
export function FollowAlong({ items }: { items: SocialMediaItem[] }) {
  const mediaItems = toBentoItems(items)
  if (mediaItems.length === 0) return null

  return (
    <section className="border-y border-gold/15 bg-cream py-16 md:py-24">
      <div className="mx-auto mb-2 max-w-5xl px-5 text-center sm:px-6">
        <Reveal>
          <Eyebrow className="justify-center">Social</Eyebrow>
        </Reveal>
      </div>

      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="Follow Along"
        description="Photos and clips from the studio floor — tap to explore, drag to rearrange."
      />

      <Reveal delay={0.1}>
        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-3 px-5 sm:mt-12 sm:gap-4 sm:px-6">
          <Link
            href={siteMeta.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-dark hover:text-champagne"
          >
            Instagram {siteMeta.instagram}
          </Link>
          <Link
            href={siteMeta.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold/50 bg-transparent px-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold hover:bg-gold/10"
          >
            TikTok {siteMeta.tiktok}
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
