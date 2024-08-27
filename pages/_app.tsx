import { useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { useThemeSwitcher } from 'hooks/useThemeSwitcher'
import localFont from 'next/font/local'

import ReactLenis from '@studio-freight/react-lenis'
import { AnimatePresence } from 'framer-motion'
import { VH } from 'components/Global/VH'
import { LayoutUnlocked } from 'components/Layouts/LayoutUnlocked'
import { LayoutLocked } from 'components/Layouts/LayoutLocked'
import { Logo } from 'components/Global/Logo'
import Link from 'next/link'

import '../styles/globals.css'

const constellation = localFont({
  src: [
    {
      path: '../fonts/Constellation-ASCII.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-constellation',
})

const selfModern = localFont({
  src: [
    {
      path: '../fonts/Self-Modern-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-self-modern',
})

export const gerstner = localFont({
  src: [
    {
      path: '../fonts/Gerstner-Programm-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-gerstner',
})

function MyApp({ Component, pageProps, router }) {
  const { setSettings, unlocked } = useSiteStore()

  useThemeSwitcher()

  useEffect(() => {
    setSettings(pageProps.settings)
  }, [pageProps.settings])

  return (
    <div
      className={`${constellation.variable} ${selfModern.variable} ${gerstner.variable} ${gerstner.variable} font-sans`}
    >
      <VH />
      <Link
        className="fixed left-20 top-21 z-[20] md:left-32 md:top-32"
        href="/"
        aria-hidden
      >
        <Logo className="h-auto w-36 md:w-52" />
      </Link>
      <ReactLenis
        options={{ lerp: 0.25 }}
        className="scrollbar-hidden relative min-h-screen overflow-auto md:h-screen"
      >
        <AnimatePresence mode="wait" initial={false}>
          {unlocked ? (
            <LayoutUnlocked
              key={router.route}
              route={router.route}
              settings={pageProps?.settings ?? {}}
            >
              <Component {...pageProps} />
            </LayoutUnlocked>
          ) : (
            <LayoutLocked
              key={router.route}
              route={router.route}
              settings={pageProps?.settings ?? {}}
            >
              <Component {...pageProps} />
            </LayoutLocked>
          )}
        </AnimatePresence>
      </ReactLenis>
    </div>
  )
}

export default MyApp
