import { useSiteStore } from 'hooks/useSiteStore'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

import { Nav } from './Nav'
import { InformationTab } from 'components/Information/InformationTab'
import { ArchiveTab } from 'components/Archive/ArchiveTab'
import { ClientToolsTab } from 'components/ClientTools/ClientToolsTab'
import { HeaderWrapper } from './HeaderWrapper'

export const Header = () => {
  const { menuOpen } = useSiteStore()
  const path = usePathname()

  return (
    <HeaderWrapper>
      <motion.div
        className="flex w-full flex-col [--y-from:-20px] md:grid md:grid-cols-3 md:[--y-from:-50px]"
        initial={{
          opacity: menuOpen ? 1 : 0,
          y: menuOpen ? 0 : 'var(--y-from)',
        }}
        animate={{
          opacity: menuOpen ? 1 : 0,
          y: menuOpen ? 0 : 'var(--y-from)',
        }}
        transition={{ duration: 0.65, ease: [0.82, 0.01, 0.22, 0.98] }}
      >
        <Nav />
        <AnimatePresence mode="wait" initial={false}>
          {path === '/information' ? <InformationTab key="info" /> : null}
          {path === '/archive' ? <ArchiveTab key="archive" /> : null}
          {path === '/client-tools' ? (
            <ClientToolsTab key="client-tools" />
          ) : null}
        </AnimatePresence>
      </motion.div>
    </HeaderWrapper>
  )
}
