import { useEffect, useMemo, useCallback, useRef } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { usePathname } from 'next/navigation'

import { HomeGallery } from './HomeGallery'
import { MenuButton } from '../Global/MenuButton'
import { Header } from '../Global/Header'
import { HomeDescription } from './HomeDescription'
import ReactLenis from '@studio-freight/react-lenis'

export default function HomePage(props) {
  const lenisRef = useRef<any>(null)
  const { menuOpen } = useSiteStore()
  const { content } = props
  const path = usePathname()

  const isInfoActive = useMemo(
    () => path === '/information' && menuOpen,
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
      <div className="col-span-8 grid w-full grid-cols-8 py-32 text-14 leading-130">
        <div className="relative col-span-3 h-full overflow-auto">
          <Header />
          <div className="relative h-[calc(calc(100vh-64px)-1.8ch)] text-[56px]"></div>
          <HomeDescription content={content} isActive={isInfoActive} />
        </div>
        <div className="sticky left-[5%] top-0 col-span-4 col-start-4 ml-auto h-screen w-[95%] self-start">
          <HomeGallery />
        </div>
        <div className="sticky top-0 self-start text-right">
          <MenuButton />
        </div>
      </div>
    </ReactLenis>
  )
}
