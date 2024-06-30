import { ClientToolsCategoryList } from './ClientToolsCategoryList'
import { ClientToolsViewSelector } from './ClientToolsViewSelector'

export const ClientToolsMenu = ({ materials }) => {
  return (
    <>
      <ClientToolsCategoryList closeOnClick={false} materials={materials} />
      <ClientToolsViewSelector />
    </>
  )
}
