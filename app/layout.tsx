import './globals.css'
import { getSettings } from '@/lib/db'
import { Analytics } from '@vercel/analytics/next'

export async function generateMetadata() {
  let name = ''
  try {
    name = (await getSettings()).name || ''
  } catch {
    // database not ready — fall back to a generic title
  }
  return {
    title: name ? `${name} | Portfolio` : 'Portfolio',
    description: 'Personal portfolio website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
