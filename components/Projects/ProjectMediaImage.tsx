import { useImage } from 'hooks/useImage'
import { motion } from 'framer-motion'

import Image from 'next/image'

export const ProjectMediaImage = ({ image }) => {
  const imageProps = useImage(image)
  if (!image) return null

  return (
    <motion.div
      layout="preserve-aspect"
      layoutId={`project-media-${image._key}`}
      transition={{
        duration: 0.55,
        ease: [0.32, 0.81, 0.02, 0.98],
      }}
      className="relative w-full overflow-hidden bg-gray will-change-auto"
      style={{ aspectRatio: image.aspectRatio }}
    >
      <Image
        src={imageProps.src}
        fill
        style={{ objectFit: 'cover' }}
        alt={image.alt}
        sizes="800px"
        className="mix-blend-darken"
      />
    </motion.div>
  )
}
