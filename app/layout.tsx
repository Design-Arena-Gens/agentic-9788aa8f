import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET UG Preparation App',
  description: 'Complete NEET UG preparation platform with Physics, Chemistry, and Biology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  )
}
