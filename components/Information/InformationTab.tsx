import { useSiteStore } from 'hooks/useSiteStore'
import { HeaderTab } from 'components/Global/HeaderTab'
import { InformationContact } from './InformationContact'
import { InformationFaqs } from './InformationFaqs'

export const InformationTab = () => {
  const { homeData } = useSiteStore()
  const information = homeData?.information

  if (!information) return null

  const { faqs, contact } = information
  console.log(information)

  return (
    <HeaderTab className="col-span-2 flex flex-col gap-24">
      <InformationFaqs title={faqs?.title} items={faqs?.items} />
      <InformationContact title={contact?.title} items={contact?.items} />
    </HeaderTab>
  )
}
