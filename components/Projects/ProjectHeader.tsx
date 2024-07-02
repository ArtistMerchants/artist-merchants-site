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
        className="left-0 z-[2] grid w-full grid-cols-2 gap-10 [--y-from:-20px] md:absolute md:top-32 md:grid-cols-3 md:[--y-from:-50px]"
        initial={{ opacity: 0, y: 'var(--y-from)' }}
        animate={{
          opacity: menuOpen ? 1 : 0,
          y: menuOpen ? 0 : 'var(--y-from)',
        }}
        transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
      >
        <div className="flex flex-col gap-10">
          <Nav />
          <ArchiveCategoryList
            className="md:hidden"
            closeOnClick={false}
            categories={allCategories}
            activeCategories={categories}
          />
        </div>
        <div className="md:col-span-2 md:grid md:grid-cols-2">
          <ArchiveCategoryList
            className="hidden md:flex"
            closeOnClick={false}
            categories={allCategories}
            activeCategories={categories}
          />
          <div className="flex flex-col gap-14 md:gap-20">
            <LabeledList label="Client" items={client} />
            {year ? <LabeledList label="Project" items={[year]} /> : null}
            {materialList?.length ? (
              <LabeledList label="Material" items={materialList} />
            ) : null}
            {techniqueList?.length ? (
              <LabeledList label="Technique" items={techniqueList} />
            ) : null}
          </div>
        </div>
      </motion.div>
    </HeaderWrapper>
  )
}
