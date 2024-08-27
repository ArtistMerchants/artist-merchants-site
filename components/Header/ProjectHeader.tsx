import { useMemo } from 'react'
import { HeaderTab } from './HeaderTab'
import { LabeledList } from 'components/Global/LabeledList'

export const ProjectHeader = ({
  client,
  year,
  taggedMaterials,
  taggedTechniques,
}) => {
  const taggedItems = useMemo(
    () => ({
      materials: getUniqueItems(taggedMaterials),
      techniques: getUniqueItems(taggedTechniques),
    }),
    [taggedMaterials, taggedTechniques]
  )

  return (
    <HeaderTab className="flex flex-col gap-14 pb-32 md:gap-20">
      <LabeledList label="Client" items={client} />
      <LabeledList label="Project" items={[year]} />
      <LabeledList label="Material" items={taggedItems.materials} />
      <LabeledList label="Technique" items={taggedItems.techniques} />
    </HeaderTab>
  )
}

const getUniqueItems = (items): string[] =>
  Array.from(new Set(items?.flatMap((item) => item?.items || []))) || []
