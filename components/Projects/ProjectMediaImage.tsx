import { motion } from 'framer-motion'
import { SiteImage } from 'components/Global/SiteImage'

export const ProjectMediaImage = ({ image }) => {
  if (!image) return null

  return (
    <motion.div
      layout="preserve-aspect"
      layoutId={`project-media-${image._key}`}
      transition={{
        duration: 0.39,
        ease: [0.32, 0.81, 0.02, 0.98],
      }}
      className="relative w-full transform-gpu overflow-hidden bg-light-gray will-change-auto"
      style={{ aspectRatio: image.aspectRatio }}
    >
      <SiteImage image={image} sizes="(max-width: 768px) 90vw, 50vw" />
    </motion.div>
  )
}
