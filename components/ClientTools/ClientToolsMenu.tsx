import { ClientToolsCategoryList } from './ClientToolsCategoryList'
import { ArchiveViewSelector } from 'components/Archive/ArchiveViewSelector'

export const ClientToolsMenu = ({ materials }) => {
  return (
    <div className="col-span-2 grid grid-cols-2">
      <ClientToolsCategoryList closeOnClick={false} materials={materials} />
      <ArchiveViewSelector />
    </div>
  )
}
