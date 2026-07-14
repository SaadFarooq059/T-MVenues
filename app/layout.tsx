import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SplashScreen } from '@/components/splash-screen'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'T&M Venue Styling | Wedding & Event Styling',
  description:
    'T&M Venue Styling dress the most beautiful UK venues — drapery, florals, centerpieces and bespoke décor for weddings, corporate events and styled shoots.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: [{ url: '/apple-icon.png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#2a2521',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} bg-background`}>
      <body className="font-sans antialiased">
        <SplashScreen />
        <Header />
        {children}
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
