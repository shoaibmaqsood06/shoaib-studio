import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
})

const jbMono = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-jbmono',
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'Shoaib Studio — Efficient Designs',
  description: 'Precision medical documentation, 3D/2D engineering drafts, and ERP systems for global clients.',
  openGraph: {
    title:    'Shoaib Studio — Efficient Designs',
    siteName: 'Shoaib Studio',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jbMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
