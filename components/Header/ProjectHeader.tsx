import { useMemo } from 'react'
import { HeaderTab } from './HeaderTab'
import { LabeledList } from 'components/Global/LabeledList'

export const ProjectHeader = ({
  client,
  year,
  taggedMaterials,
  taggedTechniques,
}) => {
  const materialList: string[] = useMemo(() => {
    if (!taggedMaterials) return []
    const materialSet = taggedMaterials?.reduce((acc, material) => {
      material?.items?.forEach((item) => acc.add(item))
      return acc
    }, new Set())
    return Array.from(materialSet)
  }, [taggedMaterials])

  const techniqueList: string[] = useMemo(() => {
    if (!taggedTechniques) return []
    const techniqueSet = taggedTechniques?.reduce((acc, technique) => {
      technique?.items?.forEach((item) => acc.add(item))
      return acc
    }, new Set())
    return Array.from(techniqueSet)
  }, [taggedTechniques])

  return (
    <HeaderTab className="flex flex-col gap-14 md:gap-20">
      <LabeledList label="Client" items={client} />
      {year ? <LabeledList label="Project" items={[year]} /> : null}
      {materialList?.length ? (
        <LabeledList label="Material" items={materialList} />
      ) : null}
      {techniqueList?.length ? (
        <LabeledList label="Technique" items={techniqueList} />
      ) : null}
    </HeaderTab>
  )
}
