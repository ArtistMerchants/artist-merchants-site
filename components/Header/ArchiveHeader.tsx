import { useAuthStore } from 'hooks/useAuthStore'

import { AnimatePresence, motion } from 'framer-motion'
import { HeaderTab } from 'components/Header/HeaderTab'
import { ArchiveForm } from 'components/Archive/ArchiveForm'
import { ArchiveCategoryList } from 'components/Archive/ArchiveCategoryList'

export const ArchiveHeader = ({
  categories = [],
  activeCategories = [],
  className = '',
}) => {
  const { unlocked } = useAuthStore()

  return (
    <HeaderTab
      className={`${className} ${
        unlocked ? 'col-span-1' : 'col-span-2'
      } order-2 row-start-2 w-full pb-32 md:order-none md:col-start-2 md:row-start-1`}
    >
      <AnimatePresence initial={false} mode="wait">
        {unlocked ? (
          <motion.div
            key="archive-unlocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <ArchiveCategoryList
              categories={categories}
              activeCategories={activeCategories}
            />
          </motion.div>
        ) : (
          <ArchiveForm />
        )}
      </AnimatePresence>
    </HeaderTab>
  )
}
