import { useRef, useEffect, Suspense } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { useClientToolsStore } from 'hooks/useClientToolsStore'

import ReactLenis from '@studio-freight/react-lenis'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuButton } from 'components/Global/MenuButton'
import { useArchiveStore } from 'hooks/useArchiveStore'
import { ClientToolsHeader } from './ClientToolsHeader'
import { ClientToolsProjectList } from './ClientToolsProjectList'
import { SiteMeta } from 'components/SiteMeta'
import { SetPdfLink } from './SetPdfLink'

export const ClientToolsListPage = (props) => {
  const { materials, activeMaterial, projects, settings } = props
  const lenisRef = useRef<any>(null)
  const { menuOpen } = useSiteStore()
  const { view } = useArchiveStore()
  const {
    materials: activeMaterials,
    techniques: activeTechniques,
    setMaterialLabel,
  } = useClientToolsStore()

  useEffect(() => {
    if (!lenisRef.current) return
    setTimeout(() => {
      lenisRef.current?.lenis?.resize()
    }, 200)
  }, [view, menuOpen, activeMaterials, activeTechniques])

  useEffect(() => {
    setMaterialLabel(activeMaterial?.title)
  }, [activeMaterial])

  return (
    <AnimatePresence initial={false}>
      <Suspense fallback={null}>
        <SetPdfLink />
      </Suspense>
      <SiteMeta {...settings} />
      <motion.div
        className="fixed bottom-20 left-0 z-[4] w-full text-center font-serif text-[10.3vw] leading-100 md:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: menuOpen ? 0 : 100, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
      >
        Artist Merchants
        <span className="relative -top-20 text-large-heading-sup">®</span>
      </motion.div>
      {menuOpen ? (
        <motion.div
          key="archive-list-menu-open"
          className="absolute inset-0 z-[1] h-full w-full"
        >
          <ReactLenis
            ref={lenisRef}
            options={{ lerp: 0.5 }}
            className="scrollbar-hidden relative min-h-screen overflow-auto md:h-screen"
          >
            <div className="relative z-[3] w-full md:hidden">
              <ClientToolsHeader
                materials={materials}
                activeMaterial={activeMaterial}
              />
            </div>
            <div className="w-full md:grid md:grid-cols-8">
              <motion.div
                className="sticky top-0 col-span-3 hidden h-screen flex-col items-start justify-between self-start overflow-auto py-20 md:flex md:py-32"
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
                  className="relative hyphens-auto font-serif text-large-heading leading-[40%]"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
                >
                  Artist Merchants
                  <span className="relative -top-20 text-large-heading-sup">
                    ®
                  </span>
                </motion.div>
              </motion.div>
              <div className="relative top-0 ml-auto w-full self-start py-20 md:col-span-3 md:col-start-5 md:py-32">
                <ClientToolsProjectList projects={projects} />
              </div>
              <div className="sticky top-0 hidden self-start py-20 text-right md:block md:py-32">
                <MenuButton />
              </div>
            </div>
          </ReactLenis>
        </motion.div>
      ) : (
        <motion.div className="absolute inset-0 z-[2] col-span-8 h-full w-full">
          <ReactLenis
            options={{ lerp: 0.5 }}
            className="scrollbar-hidden relative min-h-screen overflow-auto md:h-screen"
          >
            <div className="relative z-[3] w-full md:hidden">
              <ClientToolsHeader
                materials={materials}
                activeMaterial={activeMaterial}
              />
            </div>
            <div className="w-full md:grid md:grid-cols-8">
              <div className="col-span-7 py-20 md:py-32">
                <ClientToolsProjectList projects={projects} />
              </div>
              <div className="sticky top-0 hidden self-start py-20 text-right md:block md:py-32">
                <MenuButton />
              </div>
            </div>
          </ReactLenis>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
