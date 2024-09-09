import { useArchiveStore } from 'hooks/useArchiveStore'
import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { useAuthStore } from 'hooks/useAuthStore'
import { usePathname } from 'next/navigation'

import { motion } from 'framer-motion'
import { SiteImage } from 'components/Global/SiteImage'
import Link from 'next/link'

export const ProjectCard = ({
  client,
  year,
  media,
  id,
  slug,
  listIndex = 0,
}) => {
  const firstMedia = media?.[0]
  const { unlocked } = useAuthStore()
  const { activeCategory, view } = useArchiveStore()
  const { activeMaterial } = useClientToolsStore((state) => state)
  const path = usePathname()

  return (
    <motion.div
      layout="preserve-aspect"
      layoutId={`${listIndex}-project-card-${id}-${activeMaterial}-${activeCategory}-${unlocked}-${path}`}
      transition={{
        duration: 0.65,
        ease: [0.42, 0.71, 0.02, 0.99],
      }}
      className="relative aspect-[2/1.7] w-full overflow-hidden bg-gray will-change-auto"
    >
      <Link href={`/archive/${slug}`}>
        {firstMedia ? (
          <SiteImage
            image={firstMedia}
            sizes={view === 'multi' ? '(max-width: 768px) 33vw, 30vw' : '90vw'}
            fit="contain"
          />
        ) : null}
        <span className="sr-only">
          Project for {client?.join(', ')} from {year}
        </span>
      </Link>
    </motion.div>
  )
}
