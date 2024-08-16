import { useEffect, useRef } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'

import { motion } from 'framer-motion'
import ReactLenis from '@studio-freight/react-lenis'
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
      <div className="fixed inset-0 z-[1] h-full min-h-screen w-full">
        <ReactLenis
          ref={lenisRef}
          options={{ lerp: 0.5 }}
          className="scrollbar-hidden relative min-h-screen overflow-auto md:h-screen"
        >
          <div className="relative w-full md:grid md:grid-cols-8">
            <motion.div
              className={`relative top-0 ml-auto w-full self-start pb-20 md:col-span-3 md:col-start-5 md:pb-32 md:pt-32`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProjectMediaList media={media} />
            </motion.div>
            {/* <div className="sticky top-0 hidden self-start py-32 text-right md:block">
              <MenuButton />
            </div> */}
          </div>
        </ReactLenis>
      </div>
    </>
  )
}
