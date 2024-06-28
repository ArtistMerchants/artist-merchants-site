import { ArchiveCategoryList } from './ArchiveCategoryList'
import { ArchiveViewSelector } from './ArchiveViewSelector'

export const ArchiveMenu = ({ categories }) => {
  return (
    <div className="col-span-2 grid grid-cols-2">
      <ArchiveCategoryList closeOnClick={false} categories={categories} />
      <ArchiveViewSelector />
    </div>
  )
}
