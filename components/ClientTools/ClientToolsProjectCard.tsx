import { motion } from 'framer-motion'
import { useImage } from 'hooks/useImage'
import { usePathname } from 'next/navigation'

import Image from 'next/image'

export const ClientToolsProjectCard = ({ client, year, media, id, slug }) => {
  const firstMedia = media[0]
  const firstMediaType = media[0]._type
  const path = usePathname()

  return (
    <motion.div
      layout="preserve-aspect"
      layoutId={`client-tools-project-card-${id}-${path}`}
      transition={{
        duration: 0.55,
        ease: [0.32, 0.81, 0.02, 0.98],
      }}
      className="relative aspect-[2/1.7] w-full overflow-hidden bg-gray will-change-auto"
    >
      {firstMediaType === 'image' ? <MediaImage media={firstMedia} /> : null}
    </motion.div>
  )
}

const MediaImage = ({ media }) => {
  const imageProps = useImage(media)
  return (
    <Image
      src={imageProps.src}
      fill
      style={{ objectFit: 'cover' }}
      alt={media.alt}
      sizes="800px"
      className="mix-blend-darken"
    />
  )
}
