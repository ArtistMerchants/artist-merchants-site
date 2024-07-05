import { HeaderTab } from 'components/Header/HeaderTab'
import { ClientToolsCategoryList } from '../ClientTools/ClientToolsCategoryList'

export const ClientToolsHeader = ({ materials }) => {
  return (
    <HeaderTab className="order-2 w-full md:order-none">
      <ClientToolsCategoryList closeOnClick={false} materials={materials} />
    </HeaderTab>
  )
}
