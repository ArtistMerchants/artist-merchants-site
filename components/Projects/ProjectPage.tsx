import { useSiteStore } from 'hooks/useSiteStore'

import { AnimatePresence, motion } from 'framer-motion'
import { MenuButton } from 'components/Global/MenuButton'
import ReactLenis from '@studio-freight/react-lenis'
import { ProjectHeader } from './ProjectHeader'
import { ProjectMediaList } from './ProjectMediaList'

export const ProjectPage = (props) => {
  const { media } = props
  const { menuOpen } = useSiteStore()
  return (
    <AnimatePresence initial={false}>
      {menuOpen ? (
        <motion.div
          key="archive-list-menu-open"
          className="absolute inset-0 z-[1] h-full w-full text-14 leading-130"
        >
          <ReactLenis
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
                <ProjectHeader {...props} />
                <div></div>
                <div className="relative hyphens-auto font-serif text-[clamp(36px,5vw,56px)] leading-[90%]">
                  Artist Merchants
                  <span className="relative -top-20 text-[clamp(20px,3vw,32px)]">
                    ®
                  </span>
                </div>
              </motion.div>
              <div className="relative left-[5%] top-0 col-span-4 col-start-4 ml-auto w-[95%] self-start py-20 md:py-32">
                <ProjectMediaList media={media} />
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
                <ProjectMediaList media={media} />
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
