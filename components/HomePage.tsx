import type { Settings } from 'lib/sanity.queries'
import { Suspense } from 'react'
import { HomeGallery } from './Home/HomeGallery'
import { MenuButton } from './Global/MenuButton'
import ReactLenis from '@studio-freight/react-lenis'
import { Header } from './Global/Header'
import { PortableText } from '@portabletext/react'

export default function HomePage(props) {
  const { content } = props
  return (
    <ReactLenis className="scrollbar-hidden relative h-screen overflow-auto text-14 leading-130">
      <div className="col-span-8 grid w-full grid-cols-8 gap-10 text-14 leading-130">
        <div className="relative col-span-3 h-full overflow-auto py-32">
          <Header />
          <div className="relative h-[calc(calc(100vh-64px)-1.8ch)] text-[56px]"></div>
          <div className="hyphens-auto font-serif text-[56px] leading-120">
            Artist Merchants
            <span className="relative -top-20 text-[32px]">®</span>
            <PortableText
              value={content}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-40">{children}</p>,
                },
              }}
            />
          </div>
        </div>
        <div className="sticky left-[5%] top-0 col-span-4 col-start-4 ml-auto h-screen w-[95%] self-start py-32">
          <Suspense fallback={null}>
            <HomeGallery />
          </Suspense>
        </div>
        <div className="sticky top-0 self-start py-32 text-right">
          <MenuButton />
        </div>
      </div>
    </ReactLenis>
  )
}
