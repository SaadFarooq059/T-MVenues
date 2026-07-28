import type { SiteVideoData } from '@/lib/contentful'

/**
 * Turn a YouTube / Vimeo watch URL into an embeddable iframe src.
 * Returns null if the URL is not a recognised provider.
 */
export function toVideoEmbedUrl(
  rawUrl: string,
  opts: { autoplay?: boolean; loop?: boolean; muted?: boolean } = {},
): string | null {
  try {
    const url = new URL(rawUrl)
    const host = url.hostname.replace(/^www\./, '')

    let embed: URL | null = null

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      if (!id) return null
      embed = new URL(`https://www.youtube.com/embed/${id}`)
    } else if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id =
        url.searchParams.get('v') ||
        (url.pathname.startsWith('/embed/')
          ? url.pathname.split('/')[2]
          : url.pathname.startsWith('/shorts/')
            ? url.pathname.split('/')[2]
            : null)
      if (!id) return null
      embed = new URL(`https://www.youtube.com/embed/${id}`)
    } else if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const parts = url.pathname.split('/').filter(Boolean)
      const id = host === 'player.vimeo.com' ? parts[1] : parts[0]
      if (!id || !/^\d+$/.test(id)) return null
      embed = new URL(`https://player.vimeo.com/video/${id}`)
    }

    if (!embed) return null

    if (opts.autoplay) embed.searchParams.set('autoplay', '1')
    if (opts.muted ?? opts.autoplay) {
      embed.searchParams.set('mute', '1')
      embed.searchParams.set('muted', '1')
    }
    if (opts.loop) {
      embed.searchParams.set('loop', '1')
      const ytId = embed.pathname.split('/').pop()
      if (embed.hostname.includes('youtube') && ytId) {
        embed.searchParams.set('playlist', ytId)
      }
    }
    embed.searchParams.set('playsinline', '1')
    return embed.toString()
  } catch {
    return null
  }
}

export function resolveSiteVideoSource(video: SiteVideoData): {
  kind: 'embed' | 'file'
  src: string
} | null {
  if (video.videoUrl) {
    const embed = toVideoEmbedUrl(video.videoUrl)
    if (embed) return { kind: 'embed', src: embed }
    return { kind: 'file', src: video.videoUrl }
  }
  if (video.videoFileUrl) return { kind: 'file', src: video.videoFileUrl }
  return null
}
