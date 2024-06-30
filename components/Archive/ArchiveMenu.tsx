import { ArchiveCategoryList } from './ArchiveCategoryList'
import { ArchiveViewSelector } from './ArchiveViewSelector'

export const ArchiveMenu = ({ categories }) => {
  return (
    <>
      <ArchiveCategoryList closeOnClick={false} categories={categories} />
      <ArchiveViewSelector />
    </>
  )
}
