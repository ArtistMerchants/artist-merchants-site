import { useEffect, useMemo, useCallback, useRef } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { usePathname } from 'next/navigation'

import { motion } from 'framer-motion'
import { HomeGallery } from './HomeGallery'
import { MenuButton } from '../Global/MenuButton'
import { Header } from '../Global/Header'
import { HomeDescription } from './HomeDescription'
import ReactLenis from '@studio-freight/react-lenis'

export default function HomePage(props) {
  const { content, images } = props
  const lenisRef = useRef<any>(null)
  const { menuOpen } = useSiteStore()
  const path = usePathname()

  const isInfoActive = useMemo(
    () => path?.includes('information') && menuOpen,
    [path, menuOpen]
  )

  useEffect(() => {
    if (isInfoActive) {
      return lenisRef.current?.start()
    } else {
      lenisRef.current?.scrollTo(0, {
        immediate: false,
        lock: true,
        force: true,
        onComplete: () => {
          lenisRef.current?.stop()
        },
      })
    }
  }, [isInfoActive])

  const initializeLenisRef = useCallback(
    (props) => {
      const lenis = props?.lenis
      if (lenis && !isInfoActive) {
        lenisRef.current = lenis
        lenis.stop()
      }
    },
    [isInfoActive]
  )

  return (
    <ReactLenis
      ref={initializeLenisRef}
      className={`scrollbar-hidden relative h-screen overflow-auto text-14 leading-130`}
    >
      <div className="col-span-8 w-full text-14 leading-130 md:grid md:grid-cols-8">
        <div className="relative col-span-3 h-full overflow-auto py-20 md:py-32">
          <Header />
          <div className="relative z-[0] flex h-[calc(calc(calc(var(--vh,1vh)*100)-64px)-0.5ch)] items-center justify-center text-large-heading md:h-[calc(calc(calc(var(--vh,1vh)*100)-64px)-1.4ch)]">
            <motion.div
              className="h-[80%] w-full md:hidden"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isInfoActive ? 0 : 1,
                y: menuOpen && !isInfoActive ? '30vh' : 0,
              }}
              transition={{ duration: 0.65, ease: [0.82, 0.01, 0.22, 0.98] }}
            >
              <HomeGallery images={images} />
            </motion.div>
          </div>
          <HomeDescription content={content} isActive={isInfoActive} />
        </div>
        <div className="sticky left-[5%] top-0 col-span-4 col-start-4 ml-auto hidden h-screen w-[95%] self-start py-20 md:block md:py-32">
          <HomeGallery images={images} />
        </div>
        <div className="top-0 hidden self-start py-20 text-right md:sticky md:block md:py-32">
          <MenuButton />
        </div>
      </div>
    </ReactLenis>
  )
}
