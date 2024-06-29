import { useSiteStore } from 'hooks/useSiteStore'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

import { Nav } from './Nav'
import { InformationTab } from 'components/Information/InformationTab'
import { ArchiveTab } from 'components/Archive/ArchiveTab'

export const Header = () => {
  const { menuOpen } = useSiteStore()
  const path = usePathname()

  return (
    <motion.div
      className="absolute left-0 top-32 z-[2] grid w-full grid-cols-3 gap-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: menuOpen ? 1 : 0 }}
      transition={{ duration: 0.35 }}
    >
      <Nav />
      <AnimatePresence initial={false} mode="wait">
        {path === '/information' ? <InformationTab key="info" /> : null}
        {path === '/archive' ? <ArchiveTab key="archive" /> : null}
      </AnimatePresence>
    </motion.div>
  )
}
