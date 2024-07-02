import { HeaderTab } from 'components/Global/HeaderTab'
import { useSiteStore } from 'hooks/useSiteStore'
import { AnimatePresence, motion } from 'framer-motion'
import { ArchiveForm } from './ArchiveForm'
import { ArchiveCategoryList } from './ArchiveCategoryList'

export const ArchiveTab = () => {
  const { unlocked, homeData } = useSiteStore()

  return (
    <HeaderTab className="col-span-2 w-full md:grid md:grid-cols-2">
      <AnimatePresence initial={false} mode="wait">
        {unlocked ? (
          <motion.div
            key="archive-unlocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <ArchiveCategoryList categories={homeData?.categories} />
          </motion.div>
        ) : (
          <ArchiveForm />
        )}
      </AnimatePresence>
    </HeaderTab>
  )
}
