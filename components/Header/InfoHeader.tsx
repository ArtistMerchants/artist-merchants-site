import { HeaderTab } from 'components/Header/HeaderTab'
import { PortableText } from '@portabletext/react'
import { InformationContact } from 'components/Information/InformationContact'

export const InfoHeader = ({ data }) => {
  if (!data) return null

  const { description, contact } = data

  return (
    <HeaderTab className="col-span-2 flex max-w-[320px] flex-col gap-24">
      <div className="flex w-full flex-col gap-10">
        <PortableText
          value={description}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="leading-[120%]">{children}</p>
              ),
            },
            marks: {
              superscript: ({ children }) => (
                <span className="relative -top-4 text-[0.5em] leading-[100%]">
                  {children}
                </span>
              ),
            },
          }}
        />
      </div>
      <InformationContact title={contact?.title} items={contact?.items} />
    </HeaderTab>
  )
}
