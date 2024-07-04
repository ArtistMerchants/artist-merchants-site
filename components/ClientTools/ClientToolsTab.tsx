import { HeaderTab } from 'components/Global/HeaderTab'
import { useSiteStore } from 'hooks/useSiteStore'
import { AnimatePresence, motion } from 'framer-motion'
import { ClientToolsCategoryList } from './ClientToolsCategoryList'

export const ClientToolsTab = () => {
  const { homeData } = useSiteStore()

  return (
    <HeaderTab className="col-span-2 w-full md:grid md:grid-cols-2">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key="archive-unlocked"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <ClientToolsCategoryList
            closeOnClick={false}
            materials={homeData?.materials}
          />
        </motion.div>
      </AnimatePresence>
    </HeaderTab>
  )
}
