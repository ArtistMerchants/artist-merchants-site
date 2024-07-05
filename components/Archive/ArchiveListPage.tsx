import { useRef, useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { useArchiveStore } from 'hooks/useArchiveStore'
import { usePathname } from 'next/navigation'

import { AnimatePresence, motion } from 'framer-motion'
import { MenuButton } from 'components/Global/MenuButton'
import { ProjectList } from 'components/Projects/ProjectList'
import ReactLenis from '@studio-freight/react-lenis'

export const ArchiveListPage = ({ categories, projects, settings }) => {
  const lenisRef = useRef<any>(null)
  const { menuOpen } = useSiteStore()
  const { view } = useArchiveStore()
  const path = usePathname()

  useEffect(() => {
    if (!lenisRef.current) return
    setTimeout(() => {
      lenisRef.current?.lenis?.resize()
    }, 100)
  }, [view, menuOpen])

  return (
    <>
      <motion.div
        className="fixed bottom-20 left-0 z-[4] w-full text-center font-serif text-[10.3vw] leading-[40%] [--y-from:60px] md:hidden md:[--y-from:100px]"
        initial={{ y: 'var(--y-from)', opacity: 0 }}
        animate={{
          y: menuOpen ? 0 : 'var(--y-from)',
          opacity: menuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
      >
        Artist Merchants
        <span className="relative -top-20 text-large-heading-sup">®</span>
      </motion.div>
      <motion.div
        key="archive-list-menu-open"
        className="absolute inset-0 z-[1] h-full min-h-screen w-full"
      >
        <ReactLenis
          ref={lenisRef}
          options={{ lerp: 0.5 }}
          className="scrollbar-hidden relative min-h-screen overflow-auto md:h-screen"
        >
          <div className="relative w-full md:grid md:grid-cols-8">
            <AnimatePresence initial={false} mode="popLayout">
              {menuOpen ? (
                <motion.div
                  key={menuOpen ? 'open' : 'closed'}
                  className="relative left-0 top-0 col-span-3 hidden h-screen flex-col items-start justify-between self-start overflow-auto py-20 md:sticky md:flex md:py-32"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div></div>
                  <motion.div
                    className="relative hyphens-auto font-serif text-large-heading leading-[40%]"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 0.81, 0.13, 0.98],
                    }}
                  >
                    Artist Merchants
                    <span className="relative -top-20 text-large-heading-sup">
                      ®
                    </span>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className={`relative top-0 ml-auto w-full self-start pb-20 ${
                  menuOpen ? 'md:col-span-3 md:col-start-5' : 'md:col-span-7'
                } md:pb-32 md:pt-32`}
                key={path}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 0.81, 0.13, 0.98],
                }}
              >
                <ProjectList projects={projects} />
              </motion.div>
            </AnimatePresence>
            <div className="sticky top-0 hidden self-start py-32 text-right md:block">
              <MenuButton />
            </div>
          </div>
        </ReactLenis>
      </motion.div>
    </>
  )
}
