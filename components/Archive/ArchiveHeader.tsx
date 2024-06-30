import { useSiteStore } from 'hooks/useSiteStore'
import { motion } from 'framer-motion'

import { Nav } from 'components/Global/Nav'
import { ArchiveMenu } from './ArchiveMenu'

export const ArchiveHeader = ({ categories = [] }) => {
  const { menuOpen } = useSiteStore()

  return (
    <motion.div
      className="absolute left-0 top-32 z-[2] grid w-full grid-cols-3 gap-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -50 }}
      transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
    >
      <Nav />
      <ArchiveMenu categories={categories} />
    </motion.div>
  )
}
