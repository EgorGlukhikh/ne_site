import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import CTASection from '@/components/CTASection'
import AnimatedBackground from '@/components/AnimatedBackground'

export const metadata: Metadata = {
  title: 'Егор — личный сайт',
  description: 'Техпрототип личного сайта Егора на Next.js 14 + Tailwind',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <AnimatedBackground />
        <Header />
        {children}
        <CTASection />
      </body>
    </html>
  )
}
