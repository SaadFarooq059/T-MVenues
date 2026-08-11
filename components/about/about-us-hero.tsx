import { SiteVideo } from '@/components/media/site-video'
import { getSiteVideo, getTimelineMilestones } from '@/lib/contentful'
import { resolveSiteVideoSource } from '@/components/media/site-video-utils'
import { AboutUsHeroClient } from '@/components/about/about-us-hero-client'

const FALLBACK_THUMBNAIL = '/AboutUs/thumbnail.png'

/**
 * About hero — poster + play open a modal whose video comes from Contentful
 * Site Video (placement = "About Hero"). The journey strip below it is driven
 * by Contentful Timeline Milestone entries.
 */
export async function AboutUsHero() {
  const [video, milestones] = await Promise.all([
    getSiteVideo('About Hero'),
    getTimelineMilestones(),
  ])
  const source = video ? resolveSiteVideoSource(video) : null
  const showPlay = Boolean(source)

  return (
    <AboutUsHeroClient
      posterUrl={video?.posterUrl || FALLBACK_THUMBNAIL}
      posterAlt={video?.posterAlt}
      showPlay={showPlay}
      milestones={milestones}
    >
      <SiteVideo placement="About Hero" />
    </AboutUsHeroClient>
  )
}
