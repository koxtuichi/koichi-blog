
export const metadata = {
  title: 'kakikukekoichi.com',
  description: '写真とAIのサイト',
}

export const revalidate = 1;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
