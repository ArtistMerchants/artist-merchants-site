import { useSiteStore } from 'hooks/useSiteStore'
import { motion } from 'framer-motion'

import { Nav } from 'components/Global/Nav'
import { ArchiveCategoryList } from 'components/Archive/ArchiveCategoryList'
import { LabeledList } from 'components/Global/LabeledList'

export const ProjectHeader = (props) => {
  const { allCategories = [], categories, client, year } = props
  const { menuOpen } = useSiteStore()

  return (
    <motion.div
      className="absolute left-0 top-32 z-[2] grid w-full grid-cols-3 gap-10"
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
  )
}
