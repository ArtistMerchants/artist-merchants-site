import { HeaderTab } from 'components/Header/HeaderTab'
import { InformationContact } from 'components/Information/InformationContact'

export const ContactHeader = ({ data }) => {
  if (!data) return null

  const { contact } = data

  return (
    <HeaderTab className="col-span-2 flex flex-col gap-24">
      <InformationContact title={contact?.title} items={contact?.items} />
    </HeaderTab>
  )
}
