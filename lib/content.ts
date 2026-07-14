/**
 * Central content source. Every array here is typed and shaped so it can be
 * swapped for a Sanity CMS query later with zero component changes — the
 * components only ever receive these typed objects via props.
 */

export interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

export interface HeroSlide {
  id: string
  eyebrow: string
  headline: string[] // each entry is a line, animated in line-by-line
  subtext: string
  ctaLabel: string
  ctaHref: string
  image: string
  imageAlt: string
}

export interface Service {
  id: string
  title: string
  slug: string
  shortDescription: string
  longDescription: string
  image: string
  imageAlt: string
  included: string[]
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'Weddings' | 'Corporate' | 'Styled Shoots'
  span?: 'tall' | 'wide' | 'normal'
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  eventType: string
}

export interface Venue {
  id: string
  name: string
  location: string
}

export interface ProcessStep {
  id: string
  step: string
  title: string
  description: string
}

export const siteMeta = {
  name: 'T&M Venue Styling',
  tagline: 'Dressing the most beautiful venues for life\u2019s most treasured moments.',
  phone: '07988 320855',
  email: 'info@tmvenuestyling.com',
  instagram: '@tmvenuestyling',
  instagramUrl: 'https://instagram.com/tmvenuestyling',
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Weddings', href: '/services/weddings', description: 'Full venue styling for your celebration' },
      { label: 'Corporate Events', href: '/services/corporate-events', description: 'Polished styling for galas & launches' },
      { label: 'Commercial Shoots', href: '/services/commercial-shoots', description: 'Art-directed sets for editorial & brand' },
      { label: 'Collaborations', href: '/services/collaborations', description: 'Partnering with planners & florists' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'Wedding & Event Styling',
    headline: ['Where Every Detail', 'Becomes a Memory'],
    subtext:
      'Bespoke drapery, florals and décor that transform venues into unforgettable settings.',
    ctaLabel: 'Enquire Now',
    ctaHref: '/contact',
    image: '/images/hero-1.png',
    imageAlt:
      'Elegant wedding reception hall dressed with ivory silk drapery and tall floral centerpieces',
  },
  {
    id: 'slide-2',
    eyebrow: 'Crafted With Intention',
    headline: ['Styled To Feel', 'Effortlessly Yours'],
    subtext:
      'From grand ceremony backdrops to the smallest place setting, we compose spaces with care.',
    ctaLabel: 'View Our Work',
    ctaHref: '/gallery',
    image: '/images/hero-2.png',
    imageAlt:
      'Grand floral ceremony arch with draped fabric panels and elegant chair covers',
  },
  {
    id: 'slide-3',
    eyebrow: 'A Warm Welcome',
    headline: ['The Art of', 'Dressing a Room'],
    subtext:
      'Considered styling, luxurious textures and a warmth that makes every guest feel at home.',
    ctaLabel: 'Discover Services',
    ctaHref: '/services',
    image: '/images/hero-3.png',
    imageAlt:
      'Beautifully styled banquet table with brass candlesticks, ivory linen and a low floral runner',
  },
]

export const services: Service[] = [
  {
    id: 'weddings',
    title: 'Weddings',
    slug: 'weddings',
    shortDescription:
      'Full venue styling for your celebration — drapery, florals, tablescapes and those quiet finishing touches.',
    longDescription:
      'Your wedding day deserves a setting as considered as the moment itself. We work closely with you to translate your vision into a beautifully cohesive space, layering texture, light and colour so every corner feels intentional and every guest feels welcomed.',
    image: '/images/service-weddings.png',
    imageAlt: 'Romantic wedding reception with ivory drapery and floral centerpieces',
    included: [
      'Ceiling drapery & backdrop design',
      'Floral centerpieces & installations',
      'Chair covers, linens & tablescapes',
      'Ceremony arch & aisle styling',
      'Candlelight & ambient lighting',
    ],
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    slug: 'corporate-events',
    shortDescription:
      'Polished, brand-aware styling for galas, awards evenings, launches and conferences.',
    longDescription:
      'We bring editorial polish to corporate occasions, creating environments that reflect your brand while feeling warm and human. From awards dinners to product launches, we handle the styling so your team can focus on the moment.',
    image: '/images/service-corporate.png',
    imageAlt: 'Sophisticated corporate gala with elegant draping and uplighting',
    included: [
      'Brand-led colour & styling direction',
      'Stage & backdrop draping',
      'Table styling & centrepieces',
      'Feature installations & signage framing',
      'On-site styling team',
    ],
  },
  {
    id: 'shoots',
    title: 'Commercial Shoots',
    slug: 'commercial-shoots',
    shortDescription:
      'Art-directed set styling and props for editorial, brand and product photography.',
    longDescription:
      'We collaborate with photographers, brands and creative directors to build sets that photograph beautifully. Thoughtful prop styling, fabric and floral detail bring depth and story to every frame.',
    image: '/images/service-shoots.png',
    imageAlt: 'Art-directed styled photoshoot set with draped fabric and props',
    included: [
      'Concept & mood development',
      'Set & backdrop styling',
      'Prop sourcing & styling',
      'Floral & fabric detailing',
      'On-set styling support',
    ],
  },
  {
    id: 'collaborations',
    title: 'Collaborations',
    slug: 'collaborations',
    shortDescription:
      'Partnering with planners, florists and venues to deliver ambitious, memorable design.',
    longDescription:
      'Some of our favourite work happens alongside other creatives. We love partnering with planners, florists and venues to realise ambitious installations and shared visions, bringing our styling craft to the wider team.',
    image: '/images/service-collaborations.png',
    imageAlt: 'Stylists arranging an elaborate floral installation with draped fabric',
    included: [
      'Creative direction & concepting',
      'Large-scale installations',
      'Venue & planner partnerships',
      'Trade & styling hire',
      'Shared project management',
    ],
  },
]

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: '/images/gallery-1.png',
    alt: 'Wedding ceremony aisle lined with florals leading to a floral arch',
    category: 'Weddings',
    span: 'tall',
  },
  {
    id: 'g2',
    src: '/images/gallery-2.png',
    alt: 'Elegant wedding place setting with gold cutlery and a floral posy',
    category: 'Weddings',
    span: 'normal',
  },
  {
    id: 'g3',
    src: '/images/gallery-3.png',
    alt: 'Ceiling silk drapery with hanging floral installation over a dance floor',
    category: 'Weddings',
    span: 'wide',
  },
  {
    id: 'g4',
    src: '/images/gallery-4.png',
    alt: 'Corporate awards dinner with uplit draping and tall centrepieces',
    category: 'Corporate',
    span: 'tall',
  },
  {
    id: 'g5',
    src: '/images/gallery-5.png',
    alt: 'Styled shoot vignette with draped fabric, vintage furniture and florals',
    category: 'Styled Shoots',
    span: 'normal',
  },
  {
    id: 'g6',
    src: '/images/gallery-6.png',
    alt: 'Outdoor marquee wedding with draped ceiling and string lights at dusk',
    category: 'Weddings',
    span: 'wide',
  },
  {
    id: 'g7',
    src: '/images/gallery-7.png',
    alt: 'Lush wedding floral centerpiece with candlelight and gold accents',
    category: 'Weddings',
    span: 'tall',
  },
  {
    id: 'g8',
    src: '/images/gallery-8.png',
    alt: 'Corporate product launch space with dramatic fabric draping',
    category: 'Corporate',
    span: 'normal',
  },
  {
    id: 'g9',
    src: '/images/gallery-9.png',
    alt: 'Bridal table detail with draped backdrop, glassware and soft florals',
    category: 'Styled Shoots',
    span: 'wide',
  },
]

export const galleryCategories: Array<GalleryImage['category'] | 'All'> = [
  'All',
  'Weddings',
  'Corporate',
  'Styled Shoots',
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'T&M turned an empty barn into something out of a dream. Every guest walked in and gasped. We still cannot quite believe it was our wedding.',
    name: 'Eleanor & James',
    eventType: 'Barn Wedding, Hampshire',
  },
  {
    id: 't2',
    quote:
      'The most calm, organised and genuinely lovely team. They understood our brand instantly and the room felt elevated without ever feeling corporate.',
    name: 'Priya Mehta',
    eventType: 'Awards Evening, London',
  },
  {
    id: 't3',
    quote:
      'Working with T&M on our editorial shoot was a joy. Their eye for texture and detail gave every frame a warmth we could not have created alone.',
    name: 'Sofia Laurent',
    eventType: 'Brand Photoshoot',
  },
  {
    id: 't4',
    quote:
      'From the first consultation to the final candle being lit, they carried our vision with such care. Truly the heart of our day.',
    name: 'Charlotte & Tom',
    eventType: 'Country House Wedding',
  },
]

export const venues: Venue[] = [
  { id: 'v1', name: 'Hartwell Manor', location: 'Oxfordshire' },
  { id: 'v2', name: 'The Old Orangery', location: 'Surrey' },
  { id: 'v3', name: 'Elmwood Hall', location: 'Hampshire' },
  { id: 'v4', name: 'Greystone Barn', location: 'Cotswolds' },
  { id: 'v5', name: 'The Riverside Rooms', location: 'London' },
  { id: 'v6', name: 'Fairlight House', location: 'Kent' },
]

export const processSteps: ProcessStep[] = [
  {
    id: 'p1',
    step: '01',
    title: 'Enquiry',
    description:
      'Tell us about your day, your venue and the feeling you want to create. We listen first.',
  },
  {
    id: 'p2',
    step: '02',
    title: 'Consultation',
    description:
      'We design a bespoke styling scheme with mood, materials and a clear plan tailored to you.',
  },
  {
    id: 'p3',
    step: '03',
    title: 'Styling Day',
    description:
      'Our team dresses your venue with care and precision, handling every last detail.',
  },
  {
    id: 'p4',
    step: '04',
    title: 'The Reveal',
    description:
      'You step into a space transformed — composed, warm and unmistakably yours.',
  },
]
