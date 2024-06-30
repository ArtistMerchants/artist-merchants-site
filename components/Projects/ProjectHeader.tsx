import { useMemo } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { motion } from 'framer-motion'

import { Nav } from 'components/Global/Nav'
import { ArchiveCategoryList } from 'components/Archive/ArchiveCategoryList'
import { LabeledList } from 'components/Global/LabeledList'
import { HeaderWrapper } from 'components/Global/HeaderWrapper'

export const ProjectHeader = (props) => {
  const {
    allCategories = [],
    categories,
    client,
    year,
    taggedMaterials,
    taggedTechniques,
  } = props
  const { menuOpen } = useSiteStore()

  const materialList: string[] = useMemo(() => {
    const materialSet = taggedMaterials?.reduce((acc, material) => {
      material?.items?.forEach((item) => acc.add(item))
      return acc
    }, new Set())
    return Array.from(materialSet)
  }, [taggedMaterials])

  const techniqueList: string[] = useMemo(() => {
    const techniqueSet = taggedTechniques?.reduce((acc, technique) => {
      technique?.items?.forEach((item) => acc.add(item))
      return acc
    }, new Set())
    return Array.from(techniqueSet)
  }, [taggedTechniques])

  return (
    <HeaderWrapper>
      <motion.div
        className="left-0 z-[2] flex w-full flex-col gap-10 md:absolute md:top-32 md:grid md:grid-cols-3"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -50 }}
        transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
      >
        <Nav />
        <div className="col-span-2 grid grid-cols-2">
          <ArchiveCategoryList
            closeOnClick={false}
            categories={allCategories}
            activeCategories={categories}
          />
          <div className="flex flex-col gap-14 md:gap-20">
            <LabeledList label="Client" items={client} />
            <LabeledList label="Project" items={[year]} />
            <LabeledList label="Material" items={materialList} />
            <LabeledList label="Technique" items={techniqueList} />
          </div>
        </div>
      </motion.div>
    </HeaderWrapper>
  )
}
