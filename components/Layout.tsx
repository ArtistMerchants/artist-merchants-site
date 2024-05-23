'use client'

import ReactLenis from '@studio-freight/react-lenis'
import { FC } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <ReactLenis root options={{ lerp: 0.15 }}>
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </ReactLenis>
  )
}
