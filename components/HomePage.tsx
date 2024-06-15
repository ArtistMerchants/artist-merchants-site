import type { Settings } from 'lib/sanity.queries'
import { Layout } from './Layout'
import { Suspense } from 'react'
import { Logo } from './Global/Logo'
import { HomeGallery } from './Home/HomeGallery'
import ReactLenis from '@studio-freight/react-lenis'

export default function HomePage(props: {
  title?: string
  content?: any
  settings: Settings
}) {
  return (
    <Layout>
      <div className="grid h-screen w-full grid-cols-9 gap-10 bg-black px-32 text-14 leading-130 text-white">
        <div className="col-span-1 py-32">
          <Logo className="h-auto w-52" />
        </div>
        <ReactLenis className="scrollbar-hidden relative col-span-3 col-start-2 h-full overflow-auto py-32">
          <div className="flex flex-col gap-2 md:absolute md:left-0 md:top-32">
            <div>Information</div>
            <div>Archive</div>
            <div>Client Tools</div>
          </div>
          <div className="relative h-[calc(calc(100vh-64px)-1.8ch)] text-[56px]"></div>
          <div className="hyphens-auto font-serif text-[56px] leading-120">
            Artist Merchants<sup className="text-[32px]">®</sup> develops,
            manufactures, and distributes premium merchandise for artists and
            select brands.
          </div>
        </ReactLenis>
        <div className="relative left-[10%] col-span-4 col-start-5 h-full w-[90%] self-end py-32">
          <Suspense fallback={null}>
            <HomeGallery />
          </Suspense>
        </div>
        <div className="py-32 text-right">
          <button className="ease tracking-4 opacity-60 transition-opacity duration-300 hover:opacity-100 active:opacity-100">
            Menu
          </button>
        </div>
      </div>
    </Layout>
  )
}
