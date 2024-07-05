import { HeaderTab } from 'components/Header/HeaderTab'
import { InformationContact } from 'components/Information/InformationContact'
import { InformationFaqs } from 'components/Information/InformationFaqs'

export const InfoHeader = ({ data }) => {
  if (!data) return null

  const { faqs, contact } = data

  return (
    <HeaderTab className="col-span-2 flex flex-col gap-24">
      <InformationFaqs title={faqs?.title} items={faqs?.items} />
      <InformationContact title={contact?.title} items={contact?.items} />
    </HeaderTab>
  )
}
