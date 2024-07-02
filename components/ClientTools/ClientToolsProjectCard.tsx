import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import { SiteImage } from 'components/Global/SiteImage'

export const ClientToolsProjectCard = ({ media, id, listIndex = 0 }) => {
  const firstMedia = media[0]
  const path = usePathname()

  return (
    <motion.div
      layout="preserve-aspect"
      layoutId={`${listIndex}-client-tools-project-card-${id}-${path}`}
      transition={{
        duration: 0.55,
        ease: [0.32, 0.81, 0.02, 0.98],
      }}
      className="relative aspect-[2/1.7] w-full overflow-hidden bg-gray will-change-auto"
    >
      {firstMedia ? <SiteImage image={firstMedia} sizes="800px" /> : null}
    </motion.div>
  )
}
