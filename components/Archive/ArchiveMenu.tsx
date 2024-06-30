import { ArchiveCategoryList } from './ArchiveCategoryList'
import { ArchiveViewSelector } from './ArchiveViewSelector'

export const ArchiveMenu = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 md:col-span-2">
      <ArchiveCategoryList closeOnClick={false} categories={categories} />
      <ArchiveViewSelector />
    </div>
  )
}
