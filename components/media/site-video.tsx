import {
  getSiteVideo,
  type SiteVideoPlacement,
} from '@/lib/contentful'
import { resolveSiteVideoSource } from '@/components/media/site-video-utils'
import { SiteVideoCard } from '@/components/media/site-video-card'
import { SiteVideoPlayer } from '@/components/media/site-video-player'

/**
 * CMS-driven site video.
 * Pass the exact Contentful "placement" value, e.g. placement="Home Intro".
 *
 * - variant="card" — autoplay / loop / muted card (Home Intro)
 * - variant="player" — controls-ready player for modals (About Hero)
 *
 * Renders nothing when the entry is missing or has no playable source.
 */
export async function SiteVideo({
  placement,
  variant = 'player',
  className,
}: {
  placement: SiteVideoPlacement
  variant?: 'card' | 'player'
  className?: string
}) {
  const video = await getSiteVideo(placement)
  if (!video) return null

  const source = resolveSiteVideoSource(video)
  if (!source) return null

  if (variant === 'card') {
    return <SiteVideoCard video={video} source={source} className={className} />
  }

  return <SiteVideoPlayer video={video} source={source} className={className} />
}
