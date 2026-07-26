import {
  createClient,
  type Asset,
  type Entry,
  type EntryFieldTypes,
  type EntrySkeletonType,
} from 'contentful'

/** Contentful content type API ID for "Gallery Event" */
export const GALLERY_EVENT_CONTENT_TYPE = 'galleryEvent'

/** Contentful content type API ID for "Journey Image" */
export const JOURNEY_IMAGE_CONTENT_TYPE = 'journeyImage'

/** Contentful content type API ID for "Page Hero" */
export const PAGE_HERO_CONTENT_TYPE = 'pageHero'

/** Locked "page" field values from the Page Hero content type */
export const PAGE_HERO_PAGES = [
  'Home',
  'Gallery',
  'Services',
  'Services - Weddings',
  'Services - Corporate Events',
  'Services - Commercial Shoots',
  'Services - Collaborations',
] as const

export type PageHeroPage = (typeof PAGE_HERO_PAGES)[number]

export type PageHeroData = {
  id: string
  page: PageHeroPage
  heading: string
  subheading?: string
  heroImageUrl: string
  heroImageAlt: string
  mobileHeroImageUrl?: string
  mobileHeroImageAlt?: string
  ctaText?: string
  ctaLink?: string
}

export type GalleryEventCategory = 'Weddings' | 'Corporate' | 'Styled Shoots'

export type JourneyImageSpan = 'tall' | 'wide' | 'normal'

export type JourneyImage = {
  id: string
  title: string
  url: string
  alt: string
  category: GalleryEventCategory
  span: JourneyImageSpan
  order: number
}

export type GalleryEventPhoto = {
  url: string
  alt: string
}

export type GalleryEvent = {
  id: string
  title: string
  category: GalleryEventCategory
  coverImageUrl: string
  coverImageAlt: string
  photos: GalleryEventPhoto[]
  eventDate?: string
  description?: string
}

const CATEGORIES: GalleryEventCategory[] = [
  'Weddings',
  'Corporate',
  'Styled Shoots',
]

type AssetFields = {
  title?: string
  description?: string
  file?: {
    url?: string
  }
}

interface GalleryEventFields {
  title: EntryFieldTypes.Symbol
  category: EntryFieldTypes.Symbol
  coverImage: EntryFieldTypes.AssetLink
  photos: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  eventDate: EntryFieldTypes.Date
  description: EntryFieldTypes.Text
}

type GalleryEventSkeleton = EntrySkeletonType<GalleryEventFields, 'galleryEvent'>

interface JourneyImageFields {
  title: EntryFieldTypes.Symbol
  alt: EntryFieldTypes.Symbol
  image: EntryFieldTypes.AssetLink
  category: EntryFieldTypes.Symbol
  span: EntryFieldTypes.Symbol
  order: EntryFieldTypes.Integer
}

type JourneyImageSkeleton = EntrySkeletonType<JourneyImageFields, 'journeyImage'>

interface PageHeroFields {
  page: EntryFieldTypes.Symbol
  heading: EntryFieldTypes.Symbol
  subheading: EntryFieldTypes.Text
  heroImage: EntryFieldTypes.AssetLink
  mobileHeroImage: EntryFieldTypes.AssetLink
  ctaText: EntryFieldTypes.Symbol
  ctaLink: EntryFieldTypes.Symbol
}

type PageHeroSkeleton = EntrySkeletonType<PageHeroFields, 'pageHero'>

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

/** Delivery (published) Contentful client */
export function getContentfulClient() {
  return createClient({
    space: requireEnv('CONTENTFUL_SPACE_ID'),
    accessToken: requireEnv('CONTENTFUL_ACCESS_TOKEN'),
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  })
}

/** Preview client for draft content */
export function getContentfulPreviewClient() {
  return createClient({
    space: requireEnv('CONTENTFUL_SPACE_ID'),
    accessToken: requireEnv('CONTENTFUL_PREVIEW_TOKEN'),
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    host: 'preview.contentful.com',
  })
}

function withHttps(url: string): string {
  if (url.startsWith('//')) return `https:${url}`
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `https://${url}`
}

/** Contentful Images API — request a sharp, large render of the asset. */
function contentfulImageUrl(
  url: string,
  opts: { width: number; quality?: number } = { width: 2400 },
): string {
  try {
    const parsed = new URL(withHttps(url))
    parsed.searchParams.set('w', String(opts.width))
    parsed.searchParams.set('q', String(opts.quality ?? 90))
    parsed.searchParams.set('fm', 'webp')
    return parsed.toString()
  } catch {
    return withHttps(url)
  }
}

function resolveAsset(asset: Asset | undefined | null): GalleryEventPhoto | null {
  if (!asset || typeof asset !== 'object') return null
  const fields = asset.fields as AssetFields | undefined
  const rawUrl = fields?.file?.url
  if (!rawUrl || typeof rawUrl !== 'string') return null

  const alt =
    (typeof fields?.description === 'string' && fields.description.trim()) ||
    (typeof fields?.title === 'string' && fields.title.trim()) ||
    'Gallery photo'

  return {
    url: withHttps(rawUrl),
    alt,
  }
}

function asCategory(value: unknown): GalleryEventCategory {
  if (typeof value === 'string' && CATEGORIES.includes(value as GalleryEventCategory)) {
    return value as GalleryEventCategory
  }
  return 'Weddings'
}

function mapGalleryEvent(
  entry: Entry<GalleryEventSkeleton>,
): GalleryEvent | null {
  const title =
    typeof entry.fields.title === 'string' ? entry.fields.title.trim() : ''
  if (!title) return null

  const cover = resolveAsset(entry.fields.coverImage as Asset | undefined)
  if (!cover) return null

  const photoAssets = Array.isArray(entry.fields.photos)
    ? (entry.fields.photos as Asset[])
    : []

  const photos = photoAssets
    .map((asset) => resolveAsset(asset))
    .filter((photo): photo is GalleryEventPhoto => photo !== null)

  // Ensure lightbox always has at least the cover if photos is empty
  const galleryPhotos = photos.length > 0 ? photos : [cover]

  return {
    id: entry.sys.id,
    title,
    category: asCategory(entry.fields.category),
    coverImageUrl: cover.url,
    coverImageAlt: cover.alt || title,
    photos: galleryPhotos,
    eventDate:
      typeof entry.fields.eventDate === 'string'
        ? entry.fields.eventDate
        : undefined,
    description:
      typeof entry.fields.description === 'string'
        ? entry.fields.description
        : undefined,
  }
}

/**
 * Fetch all published Gallery Event entries.
 * Returns [] if Contentful is unreachable or the content type is missing.
 */
export async function getGalleryEvents(): Promise<GalleryEvent[]> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries<GalleryEventSkeleton>({
      content_type: GALLERY_EVENT_CONTENT_TYPE,
      include: 2,
      order: ['-fields.eventDate', '-sys.updatedAt'],
      limit: 100,
    })

    return response.items
      .map(mapGalleryEvent)
      .filter((item): item is GalleryEvent => item !== null)
  } catch (error) {
    console.warn('[contentful] getGalleryEvents failed:', error)
    return []
  }
}

function asSpan(value: unknown): JourneyImageSpan {
  if (value === 'tall' || value === 'wide' || value === 'normal') return value
  return 'normal'
}

function mapJourneyImage(
  entry: Entry<JourneyImageSkeleton>,
  index: number,
): JourneyImage | null {
  const asset = resolveAsset(entry.fields.image as Asset | undefined)
  if (!asset) return null

  const title =
    typeof entry.fields.title === 'string' ? entry.fields.title.trim() : ''
  const alt =
    typeof entry.fields.alt === 'string' && entry.fields.alt.trim()
      ? entry.fields.alt.trim()
      : asset.alt || title || 'Venue styling photograph'

  return {
    id: entry.sys.id,
    title,
    url: asset.url,
    alt,
    category: asCategory(entry.fields.category),
    span: asSpan(entry.fields.span),
    order: typeof entry.fields.order === 'number' ? entry.fields.order : index,
  }
}

/**
 * Fetch all published Journey Image entries for the home page marquee,
 * ordered by the "order" field ascending.
 * Returns [] if Contentful is unreachable or the content type is missing.
 */
export async function getJourneyImages(): Promise<JourneyImage[]> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries<JourneyImageSkeleton>({
      content_type: JOURNEY_IMAGE_CONTENT_TYPE,
      include: 1,
      order: ['fields.order', 'sys.createdAt'],
      limit: 100,
    })

    return response.items
      .map(mapJourneyImage)
      .filter((item): item is JourneyImage => item !== null)
  } catch (error) {
    console.warn('[contentful] getJourneyImages failed:', error)
    return []
  }
}

function asPageHeroPage(value: unknown): PageHeroPage | null {
  if (
    typeof value === 'string' &&
    (PAGE_HERO_PAGES as readonly string[]).includes(value)
  ) {
    return value as PageHeroPage
  }
  return null
}

function mapPageHero(entry: Entry<PageHeroSkeleton>): PageHeroData | null {
  const page = asPageHeroPage(entry.fields.page)
  if (!page) return null

  const heading =
    typeof entry.fields.heading === 'string' ? entry.fields.heading.trim() : ''
  if (!heading) return null

  const hero = resolveAsset(entry.fields.heroImage as Asset | undefined)
  if (!hero) return null

  const mobile = resolveAsset(entry.fields.mobileHeroImage as Asset | undefined)

  const subheading =
    typeof entry.fields.subheading === 'string' && entry.fields.subheading.trim()
      ? entry.fields.subheading.trim()
      : undefined

  const ctaText =
    typeof entry.fields.ctaText === 'string' && entry.fields.ctaText.trim()
      ? entry.fields.ctaText.trim()
      : undefined

  const ctaLink =
    typeof entry.fields.ctaLink === 'string' && entry.fields.ctaLink.trim()
      ? entry.fields.ctaLink.trim()
      : undefined

  return {
    id: entry.sys.id,
    page,
    heading,
    subheading,
    heroImageUrl: contentfulImageUrl(hero.url, { width: 2560, quality: 92 }),
    heroImageAlt: hero.alt || heading,
    mobileHeroImageUrl: mobile
      ? contentfulImageUrl(mobile.url, { width: 1200, quality: 90 })
      : undefined,
    mobileHeroImageAlt: mobile?.alt || hero.alt || heading,
    ctaText,
    ctaLink,
  }
}

/**
 * Fetch all Page Hero entries for a given page value (e.g. multiple Gallery slides).
 * Ordered by createdAt ascending. Returns [] if none / unreachable.
 */
export async function getPageHeroes(
  page: PageHeroPage,
): Promise<PageHeroData[]> {
  try {
    const client = getContentfulClient()
    const response = await client.getEntries<PageHeroSkeleton>({
      content_type: PAGE_HERO_CONTENT_TYPE,
      'fields.page': page,
      include: 1,
      order: ['sys.createdAt'],
      limit: 20,
    })

    return response.items
      .map(mapPageHero)
      .filter((item): item is PageHeroData => item !== null)
  } catch (error) {
    console.warn(`[contentful] getPageHeroes("${page}") failed:`, error)
    return []
  }
}

/**
 * Fetch the first Page Hero entry whose "page" field matches exactly.
 * Returns null if missing, unpublished, or Contentful is unreachable.
 */
export async function getPageHero(
  page: PageHeroPage,
): Promise<PageHeroData | null> {
  const heroes = await getPageHeroes(page)
  return heroes[0] ?? null
}
