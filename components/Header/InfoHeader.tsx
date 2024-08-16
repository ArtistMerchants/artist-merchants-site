import { HeaderTab } from 'components/Header/HeaderTab'
import { PortableText } from '@portabletext/react'

export const InfoHeader = ({ data }) => {
  if (!data) return null

  console.log(data)

  const { description } = data

  return (
    <HeaderTab className="col-span-2 flex max-w-[320px] flex-col gap-14">
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
    </HeaderTab>
  )
}
