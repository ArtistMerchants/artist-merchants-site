import { useSiteStore } from 'hooks/useSiteStore'
import { motion } from 'framer-motion'

import { Nav } from 'components/Global/Nav'
import { ClientToolsMenu } from './ClientToolsMenu'
import { ClientToolsFilters } from './ClientToolsFilters'
import { HeaderWrapper } from 'components/Global/HeaderWrapper'

export const ClientToolsHeader = ({ materials = [], activeMaterial }) => {
  const { menuOpen } = useSiteStore()

  return (
    <HeaderWrapper>
      <motion.div
        className={`z-[2] flex grid w-full grid-cols-2 flex-col gap-10 pb-32 [--y-from:-20px] md:grid-cols-3 md:[--y-from:-50px] ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0, y: 'var(--y-from)' }}
        animate={{
          opacity: menuOpen ? 1 : 0,
          y: menuOpen ? 0 : 'var(--y-from)',
        }}
        transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
      >
        <Nav />
        <ClientToolsMenu materials={materials} />
        <ClientToolsFilters {...activeMaterial} />
      </motion.div>
    </HeaderWrapper>
  )
}
