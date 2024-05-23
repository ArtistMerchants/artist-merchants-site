import { VH } from 'components/Global/VH'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="h-[10000px] bg-white text-black">
        <VH />

        {children}
      </body>
    </html>
  )
}
