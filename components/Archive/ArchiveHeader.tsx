import { useSiteStore } from 'hooks/useSiteStore'
import { motion } from 'framer-motion'

import { Nav } from 'components/Global/Nav'
import { ArchiveMenu } from './ArchiveMenu'
import { HeaderWrapper } from 'components/Global/HeaderWrapper'

export const ArchiveHeader = ({ categories = [] }) => {
  const { menuOpen } = useSiteStore()

  return (
    <HeaderWrapper>
      <motion.div
        className="flex w-full flex-col gap-10 md:grid md:grid-cols-3"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -50 }}
        transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
      >
        <Nav />
        <ArchiveMenu categories={categories} />
      </motion.div>
    </HeaderWrapper>
  )
}
