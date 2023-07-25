
export const metadata = {
  title: 'kakikukekoichi.com',
  description: '写真とAIのサイト',
}

export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
