import { useEffect, useRef } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'

import { AnimatePresence, motion } from 'framer-motion'
import { MenuButton } from 'components/Global/MenuButton'
import ReactLenis from '@studio-freight/react-lenis'
import { ProjectHeader } from './ProjectHeader'
import { ProjectMediaList } from './ProjectMediaList'
import { SiteMeta } from 'components/SiteMeta'

export const ProjectPage = (props) => {
  const lenisRef = useRef<any>(null)
  const { media, settings } = props
  const { menuOpen } = useSiteStore()

  useEffect(() => {
    if (!lenisRef.current) return
    setTimeout(() => {
      lenisRef.current?.lenis?.resize()
    }, 100)
  }, [menuOpen])

  return (
    <>
      <SiteMeta {...settings} />
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
                  className="sticky left-0 top-0 col-span-3 hidden h-screen flex-col items-start justify-between self-start overflow-auto py-20 md:flex md:py-32"
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
            <motion.div
              className={`relative top-0 ml-auto w-full self-start pb-20 ${
                menuOpen ? 'md:col-span-3 md:col-start-5' : 'md:col-span-7'
              } md:pb-32 md:pt-32`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProjectMediaList media={media} />
            </motion.div>
            <div className="sticky top-0 hidden self-start py-32 text-right md:block">
              <MenuButton />
            </div>
          </div>
        </ReactLenis>
      </motion.div>
    </>
  )
}
