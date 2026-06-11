import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import AmbientBackground from '@/components/AmbientBackground'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Mia ✨',
  description: 'Tableau de bord de points de Mia',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" style={{ fontFamily: nunito.style.fontFamily }}>
      <body className="bg-[#FEF0FF] text-[#1A1A1A] max-w-3xl mx-auto min-h-screen h-full antialiased relative">
        <AmbientBackground />
        {children}
      </body>
    </html>
  )
}
