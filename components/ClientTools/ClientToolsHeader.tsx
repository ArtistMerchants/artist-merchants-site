import { useSiteStore } from 'hooks/useSiteStore'
import { motion } from 'framer-motion'

import { Nav } from 'components/Global/Nav'
import { ClientToolsMenu } from './ClientToolsMenu'
import { ClientToolsFilters } from './ClientToolsFilters'
import { HeaderWrapper } from 'components/Global/HeaderWrapper'

export const ClientToolsHeader = ({ materials = [], activeMaterial }) => {
  const { menuOpen } = useSiteStore()

  return (
    <HeaderWrapper relative>
      <motion.div
        className="z-[2] flex w-full flex-col gap-10 md:grid md:grid-cols-3"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -50 }}
        transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
      >
        <Nav />
        <ClientToolsMenu materials={materials} />
        <ClientToolsFilters
          activeMaterial={activeMaterial}
          {...activeMaterial}
        />
      </motion.div>
    </HeaderWrapper>
  )
}
