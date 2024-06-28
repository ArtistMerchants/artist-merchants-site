import { useSiteStore } from 'hooks/useSiteStore'
import { AnimatePresence, motion } from 'framer-motion'

import { Nav } from 'components/Global/Nav'
import { ArchiveMenu } from './ArchiveMenu'

export const ArchiveHeader = ({ categories = [] }) => {
  const { menuOpen } = useSiteStore()

  return (
    <motion.div
      className="absolute left-0 top-32 z-[2] grid w-full grid-cols-3 gap-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: menuOpen ? 1 : 0 }}
      transition={{ duration: 0.35 }}
    >
      <Nav />
      <ArchiveMenu categories={categories} />
    </motion.div>
  )
}
