import { motion } from 'framer-motion'

import ReactLenis from '@studio-freight/react-lenis'
import { ProjectMediaList } from './ProjectMediaList'

export const ProjectPage = (props) => {
  const { media } = props

  return (
    <div className="z-[1] w-full px-20 md:fixed md:inset-0 md:h-full md:min-h-screen md:px-0">
      <ReactLenis
        options={{ lerp: 0.25 }}
        className="scrollbar-hidden relative min-h-screen overflow-auto md:h-screen"
      >
        <div className="relative w-full md:grid md:grid-cols-8">
          <motion.div
            className={`relative top-0 ml-auto w-full self-start pb-20 md:col-span-3 md:col-start-5 md:pb-32 md:pt-32`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.39 }}
          >
            <ProjectMediaList media={media} />
          </motion.div>
        </div>
      </ReactLenis>
    </div>
  )
}
