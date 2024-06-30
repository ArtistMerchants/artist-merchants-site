import { useSiteStore } from 'hooks/useSiteStore'
import { motion } from 'framer-motion'

import { Nav } from 'components/Global/Nav'
import { ArchiveCategoryList } from 'components/Archive/ArchiveCategoryList'
import { LabeledList } from 'components/Global/LabeledList'
import { HeaderWrapper } from 'components/Global/HeaderWrapper'

export const ProjectHeader = (props) => {
  const { allCategories = [], categories, client, year } = props
  const { menuOpen } = useSiteStore()

  return (
    <HeaderWrapper>
      <motion.div
        className="left-0 z-[2] flex w-full flex-col gap-10 md:absolute md:top-32 md:grid md:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <Nav />
        <div className="col-span-2 grid grid-cols-2">
          <ArchiveCategoryList
            closeOnClick={false}
            categories={allCategories}
            activeCategories={categories}
          />
          <div className="flex flex-col gap-14">
            <LabeledList label="Client" items={client} />
            <LabeledList label="Project" items={[year]} />
          </div>
        </div>
      </motion.div>
    </HeaderWrapper>
  )
}
