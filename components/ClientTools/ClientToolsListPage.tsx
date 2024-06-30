import { useRef, useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { useClientToolsStore } from 'hooks/useClientToolsStore'

import ReactLenis from '@studio-freight/react-lenis'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuButton } from 'components/Global/MenuButton'
import { useArchiveStore } from 'hooks/useArchiveStore'
import { ClientToolsHeader } from './ClientToolsHeader'
import { ClientToolsProjectList } from './ClientToolsProjectList'

export const ClientToolsListPage = (props) => {
  const { materials, activeMaterial, projects } = props
  const lenisRef = useRef<any>(null)
  const { menuOpen } = useSiteStore()
  const { view } = useArchiveStore()
  const { materials: activeMaterials, techniques: activeTechniques } =
    useClientToolsStore()

  useEffect(() => {
    if (!lenisRef.current) return
    setTimeout(() => {
      lenisRef.current?.lenis?.resize()
    }, 200)
  }, [view, menuOpen, activeMaterials, activeTechniques])

  return (
    <AnimatePresence initial={false}>
      {menuOpen ? (
        <motion.div
          key="archive-list-menu-open"
          className="absolute inset-0 z-[1] h-full w-full text-14 leading-130"
        >
          <ReactLenis
            ref={lenisRef}
            options={{ lerp: 0.15 }}
            className="scrollbar-hidden relative h-screen overflow-auto"
          >
            <div className="grid w-full grid-cols-8 text-14 leading-130">
              <motion.div
                className="sticky top-0 col-span-3 flex h-screen flex-col items-start justify-between self-start overflow-auto py-20 md:py-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ClientToolsHeader
                  materials={materials}
                  activeMaterial={activeMaterial}
                />
                <div></div>
                <motion.div
                  className="relative hyphens-auto font-serif text-[clamp(36px,5vw,56px)] leading-110"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
                >
                  Artist Merchants
                  <span className="relative -top-20 text-[clamp(20px,3vw,32px)]">
                    ®
                  </span>
                </motion.div>
              </motion.div>
              <div className="relative left-[5%] top-0 col-span-4 col-start-4 ml-auto w-[95%] self-start py-20 md:py-32">
                <ClientToolsProjectList projects={projects} />
              </div>
              <div className="sticky top-0 self-start py-20 text-right md:py-32">
                <MenuButton />
              </div>
            </div>
          </ReactLenis>
        </motion.div>
      ) : (
        <motion.div className="absolute inset-0 z-[2] col-span-8 h-full w-full text-14 leading-130">
          <ReactLenis
            options={{ lerp: 0.15 }}
            className="scrollbar-hidden relative h-screen overflow-auto text-14 leading-130"
          >
            <div className="grid w-full grid-cols-8 text-14 leading-130">
              <div className="col-span-7 py-20 md:py-32">
                <ClientToolsProjectList projects={projects} />
              </div>
              <div className="sticky top-0 self-start py-20 text-right md:py-32">
                <MenuButton />
              </div>
            </div>
          </ReactLenis>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
