import { useEffect, useMemo, useRef } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { createClientToolsStore } from 'hooks/createClientToolsStore'
import { ClientToolsContext } from 'components/ClientTools/ClientTools.context'

import { useThemeSwitcher } from 'hooks/useThemeSwitcher'
import localFont from 'next/font/local'

import ReactLenis from '@studio-freight/react-lenis'
import { AnimatePresence } from 'framer-motion'
import { VH } from 'components/Global/VH'
import { LayoutUnlocked } from 'components/Layouts/LayoutUnlocked'
import { LayoutLocked } from 'components/Layouts/LayoutLocked'

import '../styles/globals.css'
import { HomeButton } from 'components/Global/HomeButton'

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
  const { setSettings } = useSiteStore()
  const store = useRef(
    createClientToolsStore({
      activeMaterial: pageProps?.settings?.materials[0]?.slug,
      materialLabel: pageProps?.settings?.materials[0]?.title,
    })
  ).current

  useThemeSwitcher()

  useEffect(() => {
    setSettings(pageProps.settings)
  }, [pageProps.settings])

  const isLocked = useMemo(() => {
    const lockedPaths = ['/login', '/']
    return lockedPaths.includes(router.asPath)
  }, [router.pathname])

  return (
    <div
      className={`${constellation.variable} ${selfModern.variable} ${gerstner.variable} ${gerstner.variable} font-sans`}
    >
      <VH />
      <HomeButton />
      <ReactLenis
        options={{ lerp: 0.25 }}
        className="scrollbar-hidden relative min-h-screen overflow-auto md:h-screen"
      >
        <ClientToolsContext.Provider value={store}>
          <AnimatePresence mode="wait" initial={false}>
            {isLocked ? (
              <LayoutLocked
                key={router.route}
                route={router.route}
                settings={pageProps?.settings ?? {}}
              >
                <Component {...pageProps} />
              </LayoutLocked>
            ) : (
              <LayoutUnlocked
                key={router.route}
                route={router.route}
                settings={pageProps?.settings ?? {}}
              >
                <Component {...pageProps} />
              </LayoutUnlocked>
            )}
          </AnimatePresence>
        </ClientToolsContext.Provider>
      </ReactLenis>
    </div>
  )
}

export default MyApp
