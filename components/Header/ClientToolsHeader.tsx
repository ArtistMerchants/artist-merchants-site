import { HeaderTab } from 'components/Header/HeaderTab'
import { ClientToolsCategoryList } from '../ClientTools/ClientToolsCategoryList'

export const ClientToolsHeader = ({ materials }) => {
  return (
    <HeaderTab className="col-start-1 row-start-2 w-full md:order-none md:col-start-2 md:row-start-1">
      <ClientToolsCategoryList materials={materials} />
    </HeaderTab>
  )
}
