export const metadata = {
  title: 'Portfolio | Mathematics Undergraduate',
  description: 'Personal portfolio website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
