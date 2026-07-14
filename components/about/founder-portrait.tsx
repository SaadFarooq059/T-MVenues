'use client'

import Image from 'next/image'
import { GlowingEffect } from '@/components/ui/glowing-effect'

export function FounderPortrait() {
  return (
    <div className="relative rounded-2xl border border-gold/20 p-2 md:rounded-3xl md:p-3">
      <GlowingEffect
        spread={40}
        glow
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-gold/15 bg-muted md:rounded-2xl">
        <Image
          src="/AboutUs/founder.jpg"
          alt="Katie and Lucie, the founders of T&M Venue Styling"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}
