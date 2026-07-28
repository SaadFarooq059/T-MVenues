import { SiteVideo } from '@/components/media/site-video'
import { getSiteVideo } from '@/lib/contentful'
import { resolveSiteVideoSource } from '@/components/media/site-video-utils'
import { AboutUsHeroClient } from '@/components/about/about-us-hero-client'

const FALLBACK_THUMBNAIL = '/AboutUs/thumbnail.png'

/**
 * About hero — poster + play open a modal whose video comes from Contentful
 * Site Video (placement = "About Hero").
 */
export async function AboutUsHero() {
  const video = await getSiteVideo('About Hero')
  const source = video ? resolveSiteVideoSource(video) : null
  const showPlay = Boolean(source)

  return (
    <AboutUsHeroClient
      posterUrl={video?.posterUrl || FALLBACK_THUMBNAIL}
      posterAlt={video?.posterAlt}
      showPlay={showPlay}
    >
      <SiteVideo placement="About Hero" />
    </AboutUsHeroClient>
  )
}
