import { useEffect, useRef } from 'react'
import { useAuthStore } from 'hooks/useAuthStore'
import { useSiteStore } from 'hooks/useSiteStore'
import { createClientToolsStore } from 'hooks/createClientToolsStore'
import { useThemeSwitcher } from 'hooks/useThemeSwitcher'
import { ClientToolsContext } from 'components/ClientTools/ClientTools.context'
import localFont from 'next/font/local'

import ReactLenis from '@studio-freight/react-lenis'
import { AnimatePresence } from 'framer-motion'
import { VH } from 'components/Global/VH'
import { LayoutUnlocked } from 'components/Layouts/LayoutUnlocked'
import { LayoutLocked } from 'components/Layouts/LayoutLocked'
import { HomeButton } from 'components/Global/HomeButton'
import { SkipLink } from 'components/Global/SkipLink'

import '../styles/globals.css'

export const constellation = localFont({
  src: [
    {
      path: '../fonts/Constellation-ASCII.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  preload: true,
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
  preload: true,
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
  preload: true,
  display: 'swap',
  variable: '--font-gerstner',
})

function MyApp({ Component, pageProps, router }) {
  const { unlocked } = useAuthStore()
  const { setSettings } = useSiteStore()
  const store = useRef(
    createClientToolsStore({
      activeMaterial: pageProps?.settings?.materials?.[0]?.slug,
    })
  ).current

  useThemeSwitcher()

  useEffect(() => {
    if (unlocked) {
      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', 'polite')
      announcement.textContent = 'Content unlocked'
      document.body.appendChild(announcement)
      setTimeout(() => document.body.removeChild(announcement), 1000)
    }
  }, [unlocked])

  useEffect(() => {
    setSettings(pageProps.settings)
  }, [pageProps.settings])

  return (
    <div
      className={`${constellation.variable} ${selfModern.variable} ${gerstner.variable} ${gerstner.variable} font-sans`}
    >
      <VH />
      <SkipLink />
      {/* <HomeButton /> */}
      <ReactLenis
        options={{ lerp: 0.25 }}
        className="scrollbar-hidden relative min-h-screen overflow-auto md:h-screen"
      >
        <ClientToolsContext.Provider value={store}>
          <AnimatePresence mode="wait" initial={false}>
            {!unlocked ? (
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
