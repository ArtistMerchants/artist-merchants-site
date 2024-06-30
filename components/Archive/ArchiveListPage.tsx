import { useRef, useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'

import { AnimatePresence, motion } from 'framer-motion'
import { MenuButton } from 'components/Global/MenuButton'
import { ArchiveHeader } from './ArchiveHeader'
import { ProjectList } from 'components/Projects/ProjectList'
import ReactLenis from '@studio-freight/react-lenis'
import { useArchiveStore } from 'hooks/useArchiveStore'

export const ArchiveListPage = ({ categories, projects }) => {
  const lenisRef = useRef<any>(null)
  const { menuOpen } = useSiteStore()
  const { view } = useArchiveStore()

  useEffect(() => {
    if (!lenisRef.current) return
    setTimeout(() => {
      lenisRef.current?.lenis?.resize()
    }, 100)
  }, [view, menuOpen])

  return (
    <AnimatePresence initial={false}>
      <div className="absolute z-[3] w-full text-14 leading-130 md:hidden">
        <ArchiveHeader categories={categories} />
      </div>
      <motion.div
        className="fixed bottom-20 left-0 z-[4] w-full text-center font-serif text-[10.3vw] leading-100 md:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: menuOpen ? 0 : 100, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
      >
        Artist Merchants
        <span className="relative -top-20 text-[clamp(20px,3vw,32px)]">®</span>
      </motion.div>
      {menuOpen ? (
        <motion.div
          key="archive-list-menu-open"
          className="absolute inset-0 z-[1] h-full min-h-screen w-full text-14 leading-130"
        >
          <ReactLenis
            ref={lenisRef}
            options={{ lerp: 0.15 }}
            className="scrollbar-hidden relative min-h-screen overflow-auto md:h-screen"
          >
            <div className="w-full text-14 leading-130 md:grid md:grid-cols-8">
              <motion.div
                className="sticky top-0 col-span-3 hidden h-screen flex-col items-start justify-between self-start overflow-auto py-20 md:flex md:py-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ArchiveHeader categories={categories} />
                <div></div>
                <motion.div
                  className="relative hyphens-auto font-serif text-large-heading leading-110"
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
              <div className="mb:pb-32 relative top-0 ml-auto w-full self-start pb-20 pt-350 md:left-[5%] md:col-span-4 md:col-start-4 md:w-[95%] md:pt-32">
                <ProjectList projects={projects} />
              </div>
              <div className="sticky top-0 hidden self-start py-32 text-right md:block">
                <MenuButton />
              </div>
            </div>
          </ReactLenis>
        </motion.div>
      ) : (
        <motion.div className="absolute inset-0 z-[2] h-full min-h-screen w-full text-14 leading-130 md:col-span-8  md:pt-0">
          <ReactLenis
            options={{ lerp: 0.15 }}
            className="scrollbar-hidden relative min-h-screen overflow-auto text-14 leading-130 md:h-screen"
          >
            <div className="w-full text-14 leading-130 md:grid md:grid-cols-8">
              <div className="col-span-7 pb-20 pt-200 md:pb-32 md:pt-32">
                <ProjectList projects={projects} />
              </div>
              <div className="sticky top-0 hidden self-start py-32 text-right md:block">
                <MenuButton />
              </div>
            </div>
          </ReactLenis>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
