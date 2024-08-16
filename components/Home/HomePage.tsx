import { useEffect, useMemo, useCallback, useRef } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { usePathname } from 'next/navigation'

import { motion } from 'framer-motion'
import { HomeGallery } from './HomeGallery'
import { HomeDescription } from './HomeDescription'
import { Loading } from 'components/Loading/Loading'
import ReactLenis from '@studio-freight/react-lenis'

export default function HomePage(props) {
  const { images, information } = props
  const { loading } = useSiteStore()

  if (loading) return null

  return (
    <div className="md:fixed md:inset-0 md:grid md:h-full md:w-full md:grid-cols-9">
      <div className="col-span-8 col-start-2 w-full md:grid md:grid-cols-8">
        <div className="relative col-span-3 h-full overflow-auto py-20 md:py-32">
          <div className="relative z-[0] flex h-[calc(calc(calc(var(--vh,1vh)*100)-64px)-0.5ch)] items-center justify-center text-large-heading md:h-[calc(calc(calc(var(--vh,1vh)*100)-64px)-1.15ch)]">
            <div className="relative top-[5vw] h-[80%] w-full transform-gpu will-change-auto md:hidden">
              <HomeGallery images={images} />
            </div>
          </div>
          <HomeDescription content={information?.description} />
        </div>
        <div className="sticky top-0 col-span-4 col-start-4 ml-auto hidden h-screen w-[calc(100%-calc(calc(100vw/9)/2))] self-start py-20 md:block md:py-32">
          <HomeGallery images={images} />
        </div>
      </div>
    </div>
  )
}
