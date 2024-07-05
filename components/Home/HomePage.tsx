import { useEffect, useMemo, useCallback, useRef } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { usePathname } from 'next/navigation'

import { motion } from 'framer-motion'
import { HomeGallery } from './HomeGallery'
import { HomeDescription } from './HomeDescription'
import { Loading } from 'components/Loading/Loading'
import ReactLenis from '@studio-freight/react-lenis'

export default function HomePage(props) {
  const { images, information, settings } = props
  const lenisRef = useRef<any>(null)
  const { menuOpen, loading } = useSiteStore()
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
      options={{ lerp: 0.5 }}
      className={`scrollbar-hidden relative h-screen overflow-auto`}
    >
      <Loading images={images} />
      {!loading ? (
        <div className="col-span-8 w-full md:grid md:grid-cols-8">
          <div className="relative col-span-3 h-full overflow-auto py-20 md:py-32">
            <div className="relative z-[0] flex h-[calc(calc(calc(var(--vh,1vh)*100)-64px)-0.5ch)] items-center justify-center text-large-heading md:h-[calc(calc(calc(var(--vh,1vh)*100)-64px)-1.15ch)]">
              <motion.div
                className="relative top-[5vw] h-[80%] w-full transform-gpu will-change-auto md:hidden"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isInfoActive ? 0 : 1,
                  y: menuOpen && !isInfoActive ? '30vh' : 0,
                }}
                transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
              >
                <HomeGallery images={images} />
              </motion.div>
            </div>
            <HomeDescription
              content={information?.description}
              isActive={isInfoActive}
            />
          </div>
          <div className="sticky top-0 col-span-4 col-start-4 ml-auto hidden h-screen w-[calc(100%-calc(calc(100vw/9)/2))] self-start py-20 md:block md:py-32">
            <HomeGallery images={images} />
          </div>
        </div>
      ) : null}
    </ReactLenis>
  )
}
