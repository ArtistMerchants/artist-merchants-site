import { useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'

import { Wordmark } from 'components/Global/Wordmark'
import { HomeGallery } from './HomeGallery'
import { usePathname } from 'next/navigation'

export default function HomePage(props) {
  const { images } = props
  const { loading, hasLoaded } = useSiteStore()

  const path = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      document.body.classList.add('overflow-hidden')

      return () => {
        document.body.classList.remove('overflow-hidden')
      }
    }
  }, [])

  if (loading && !hasLoaded) return null

  return (
    <div className="fixed inset-0 flex h-screen w-full flex-col justify-end gap-10 px-20 md:relative md:block md:h-full md:px-0">
      <div
        className={`
          ease-global ml-auto aspect-[2/2.5] h-auto w-full origin-bottom transition-[transform,opacity] duration-[450ms] md:aspect-[unset] md:h-full md:w-[90%]
          ${
            path === '/'
              ? 'scale-100 opacity-100'
              : 'scale-[0.98] opacity-0 md:scale-100 md:opacity-100'
          }
        `}
      >
        <HomeGallery images={images.filter((image) => !image.hide)} />
      </div>
      <div className="h-auto w-full py-20 md:hidden">
        <Wordmark className="h-auto w-full" />
      </div>
    </div>
  )
}
