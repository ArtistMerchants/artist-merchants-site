'use client'

import ReactLenis from '@studio-freight/react-lenis'
import { FC } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <ReactLenis root options={{ lerp: 0.15 }}>
      <main className="min-h-screen">{children}</main>
    </ReactLenis>
  )
}
