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

export interface ServiceHighlight {
  title: string
  description: string
}

export interface Service {
  id: string
  title: string
  /** Singular form for prose, e.g. "wedding" for the "Weddings" service */
  singularTitle: string
  slug: string
  shortDescription: string
  longDescription: string
  /** Copy for the "How We Deliver" section; falls back to `longDescription` */
  deliverDescription?: string
  image: string
  imageAlt: string
  included: string[]
  /** Same ground as `included`, with supporting copy for the bento grid */
  highlights?: ServiceHighlight[]
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
  tagline: "Dressing beautiful spaces for the moments you'll remember.",
  phone: '07988 320855',
  email: 'info@tmvenuestyling.com',
  instagram: '@tmvenuestyling',
  instagramUrl: 'https://instagram.com/tmvenuestyling',
  tiktok: '@tm.venue.styling',
  tiktokUrl: 'https://www.tiktok.com/@tm.venue.styling',
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
    eyebrow: 'T&M Venue Styling',
    headline: ['Where Your Story Begins'],
    subtext:
      "Beautifully styled spaces for weddings and events that feel completely you. From the big statement pieces to the little details that bring everything together, we'll help transform your venue into a space you'll love walking into.",
    ctaLabel: 'View Our Work',
    ctaHref: '/gallery',
    image: '/images/hero-1.jpg',
    imageAlt:
      'Elegant wedding reception hall dressed with ivory silk drapery and tall floral centerpieces',
  },
]

export const services: Service[] = [
  {
    id: 'weddings',
    title: 'Weddings',
    singularTitle: 'wedding',
    slug: 'weddings',
    shortDescription:
      "From the ceremony to the wedding breakfast, we'll bring everything together beautifully.",
    longDescription:
      "Your day, your way. We'll work with you to bring everything together beautifully — from the colours and textures to those little finishing touches that make all the difference. The result? A space that feels completely yours, and one your guests will love being in.",
    deliverDescription:
      "Your wedding should feel like you. We'll work with you to bring your ideas to life, layering colours, textures and all those little details that make a space feel special. Everything comes together beautifully, so it feels welcoming, personal and completely yours.",
    image: '/Home/service1.jpg',
    imageAlt: 'Romantic wedding reception with ivory drapery and floral centerpieces',
    included: [
      'Backdrops',
      'Faux floral accents and touches',
      'Chair styling, linens & tablescapes',
      'Ceremony arches & aisle styling',
      'Candlelight & ambient lighting',
    ],
    highlights: [
      {
        title: 'Ceiling drapery & backdrops',
        description:
          'Transform the feel of the room before your guests even arrive. Soft draping and beautiful backdrops work with your venue to soften the space and create the perfect setting for those all-important moments.',
      },
      {
        title: 'Faux florals & greenery',
        description:
          'All the beauty, none of the wilting. Think trailing faux greenery runners, pretty silk flower bud vases and carefully placed floral accents to bring backdrops and key areas to life.',
      },
      {
        title: 'Linens, chairs & tablescapes',
        description:
          "This is where all the lovely little details come together. We'll layer linens, place settings, chairs and finishing touches to create tables that feel beautifully put together, without feeling overdone.",
      },
      {
        title: 'Ceremony & aisle styling',
        description:
          "Make the walk down the aisle feel every bit as special as it should. We'll style the space around you, creating a beautiful backdrop for the moment you say “yes”.",
      },
      {
        title: 'Candlelight & ambience',
        description:
          "Because good lighting changes everything. We'll add that warm, candlelit glow that takes you from the ceremony right through to the last dance.",
      },
    ],
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    singularTitle: 'corporate event',
    slug: 'corporate-events',
    shortDescription:
      'Styling that makes your event look polished, memorable and completely on-brand.',
    longDescription:
      "From team celebrations to awards nights and product launches, we'll help you create a space that looks the part and feels like your brand. We'll take care of all the styling and finishing touches, so you can focus on your guests — and actually enjoy the event too.",
    image: '/Home/service2.jpg',
    imageAlt: 'Sophisticated corporate gala with elegant draping and uplighting',
    included: [
      'Colour & styling direction',
      'Stage & backdrop draping',
      'Table styling & centrepieces',
      'Feature installations & signage',
      'On-site styling team',
    ],
    highlights: [
      {
        title: 'Styling that feels like your brand',
        description:
          "We'll take your colours, style and overall feel and bring them into the space in a way that feels natural and unmistakably you — never too corporate or overdone.",
      },
      {
        title: 'Stage & backdrop styling',
        description:
          "From speeches and awards to product launches, we'll create a polished backdrop that frames the moment beautifully — and looks great in the photos too.",
      },
      {
        title: 'Tables & centrepieces',
        description:
          "We'll bring the tables together — creating a look that feels special while still leaving plenty of room to chat, eat and enjoy the evening.",
      },
      {
        title: 'Installations & signage',
        description:
          'Statement backdrops, branded signage and those extra little details that help your guests find their way — while giving them a great spot for a photo along the way.',
      },
      {
        title: 'On-site styling team',
        description:
          "We'll take care of the set-up and pack it all away afterwards. One less thing for your team to think about.",
      },
    ],
  },
  {
    id: 'shoots',
    title: 'Commercial Shoots',
    singularTitle: 'shoot',
    slug: 'commercial-shoots',
    shortDescription:
      'Need to create the right look for a campaign, shoot or piece of content? We can help bring the whole setting together.',
    longDescription:
      "Got a vision in mind? We'll help bring it to life. From styled shoots and brand content to creative set-ups, we'll pull together backdrops, props, fabrics and finishing touches to create a space that looks just as good on camera as it does in real life.",
    image: '/Home/service3.jpg',
    imageAlt: 'Art-directed styled photoshoot set with draped fabric and props',
    included: [
      'Concept & mood development',
      'Set & backdrop styling',
      'Prop sourcing',
      'Floral & fabric details',
      'On-set styling support',
    ],
    highlights: [
      {
        title: 'Ideas & inspiration',
        description:
          "We'll start with your ideas, colours and the overall look you're going for, then pull everything together into a clear direction before we get started.",
      },
      {
        title: 'Set & backdrop styling',
        description:
          "From simple backdrops to layered draping and styled sets, we'll create a space that works beautifully on camera and gives you the perfect setting for your shoot.",
      },
      {
        title: 'Props & styling',
        description:
          "Tableware, glassware, furniture and all those little extras that make the shot. We'll source and style the pieces you need, with plenty available from our own collection too.",
      },
      {
        title: 'Faux florals & finishing touches',
        description:
          'Silk flowers, faux greenery, fabrics and carefully chosen details add that extra layer of texture and interest — especially for those all-important close-ups.',
      },
      {
        title: 'On-set support',
        description:
          'Need us there on the day? We can stay on hand to tweak, reset and keep everything looking just right from one shot to the next.',
      },
    ],
  },
  {
    id: 'collaborations',
    title: 'Collaborations',
    singularTitle: 'collaboration',
    slug: 'collaborations',
    shortDescription:
      'We love working alongside brilliant venues, planners, florists and other creatives to make something special happen.',
    longDescription:
      "We love working with other creatives to bring an idea together. Whether you're a planner, florist, venue or fellow stylist, we're always happy to collaborate, add our own little bit of magic and help turn a shared vision into something really special.",
    image: '/images/service-collaborations.jpg',
    imageAlt: 'Stylists arranging an elaborate floral installation with draped fabric',
    included: [
      'Creative direction & concepts',
      'Large-scale installations',
      'Venue & planner partnerships',
      'Trade & styling hire',
      'Shared project management',
    ],
    highlights: [
      {
        title: 'Creative direction',
        description:
          "Got an idea already? Great. Need a little help pulling it together? We can do that too. We'll work alongside you to create a clear look that everyone feels excited about.",
      },
      {
        title: 'Statement installations',
        description:
          "For those moments that need a little extra wow. From beautiful draping and statement backdrops to carefully styled focal points, we'll work with you and your venue to bring the idea to life.",
      },
      {
        title: 'Venue & planner partnerships',
        description:
          "Think of us as an extra pair of hands on your team. We'll work around you, your timings and your client, making the styling side feel easy from start to finish.",
      },
      {
        title: 'Trade styling & hire',
        description:
          'Need the pieces without the full styling service? Our collection of décor, backdrops and signage is available to fellow venues, planners and creatives too.',
      },
      {
        title: 'Working together',
        description:
          "One point of contact, clear plans and plenty of communication along the way. We'll keep our side organised, so bringing everything together feels nice and straightforward.",
      },
    ],
  },
]

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: '/images/gallery-1.jpg',
    alt: 'Wedding ceremony aisle lined with florals leading to a floral arch',
    category: 'Weddings',
    span: 'tall',
  },
  {
    id: 'g2',
    src: '/images/gallery-2.jpg',
    alt: 'Elegant wedding place setting with gold cutlery and a floral posy',
    category: 'Weddings',
    span: 'normal',
  },
  {
    id: 'g3',
    src: '/images/gallery-3.jpg',
    alt: 'Ceiling silk drapery with hanging floral installation over a dance floor',
    category: 'Weddings',
    span: 'wide',
  },
  {
    id: 'g4',
    src: '/images/gallery-4.jpg',
    alt: 'Corporate awards dinner with uplit draping and tall centrepieces',
    category: 'Corporate',
    span: 'tall',
  },
  {
    id: 'g5',
    src: '/images/gallery-5.jpg',
    alt: 'Styled shoot vignette with draped fabric, vintage furniture and florals',
    category: 'Styled Shoots',
    span: 'normal',
  },
  {
    id: 'g6',
    src: '/images/gallery-6.jpg',
    alt: 'Outdoor marquee wedding with draped ceiling and string lights at dusk',
    category: 'Weddings',
    span: 'wide',
  },
  {
    id: 'g7',
    src: '/images/gallery-7.jpg',
    alt: 'Lush wedding floral centerpiece with candlelight and gold accents',
    category: 'Weddings',
    span: 'tall',
  },
  {
    id: 'g8',
    src: '/images/gallery-8.jpg',
    alt: 'Corporate product launch space with dramatic fabric draping',
    category: 'Corporate',
    span: 'normal',
  },
  {
    id: 'g9',
    src: '/images/gallery-9.jpg',
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
      'You did such a wonderful job, and the table looked so beautiful. It really helped create such a lovely visual feature for the guests who joined us.',
    name: 'CJ',
    eventType: 'May 2026',
  },
  {
    id: 't2',
    quote:
      'The girls were amazing from start to finish. They knew exactly what our vision was and truly exceeded it — we couldn\u2019t have been happier.',
    name: 'E&J',
    eventType: 'May 2026',
  },
  {
    id: 't3',
    quote:
      'From the moment we met, we knew we were in the best hands. Your warmth and genuine passion instantly put us at ease.',
    name: 'A Kind Client',
    eventType: 'Wedding',
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
