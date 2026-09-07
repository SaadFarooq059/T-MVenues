import type { Metadata } from 'next'
import { ContactHero } from '@/components/contact/contact-hero'
import { HatsInquiryForm } from '@/components/contact/hats-inquiry-form'

export const metadata: Metadata = {
  title: 'Contact | T&M Venue Styling',
  description:
    'Start the conversation. Enquire about wedding, corporate and editorial styling with T&M Venue Styling.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <HatsInquiryForm />
    </>
  )
}
