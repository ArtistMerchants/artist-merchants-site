import { HeaderTab } from 'components/Header/HeaderTab'
import { ClientToolsCategoryList } from '../ClientTools/ClientToolsCategoryList'

export const ClientToolsHeader = ({ materials }) => {
  return (
    <HeaderTab className="order-2 row-start-2 w-full md:order-none md:col-start-2 md:row-start-1">
      <ClientToolsCategoryList closeOnClick={false} materials={materials} />
    </HeaderTab>
  )
}
