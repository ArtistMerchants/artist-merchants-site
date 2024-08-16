import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import Link from 'next/link'
import { SiteImage } from 'components/Global/SiteImage'

export const ProjectCard = ({
  client,
  year,
  media,
  id,
  slug,
  listIndex = 0,
}) => {
  const firstMedia = media[0]
  const path = usePathname()

  return (
    <motion.div
      layout="preserve-aspect"
      layoutId={`${listIndex}-project-card-${id}-${path}`}
      transition={{
        duration: 0.65,
        ease: [0.42, 0.71, 0.02, 0.99],
      }}
      className="relative aspect-[2/1.7] w-full overflow-hidden bg-gray will-change-auto"
    >
      <Link href={`/archive/${slug}`}>
        {firstMedia ? <SiteImage image={firstMedia} sizes="800px" /> : null}
        <span className="sr-only">
          Project for {client?.join(', ')} from {year}
        </span>
      </Link>
    </motion.div>
  )
}
