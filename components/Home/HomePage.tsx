import { useSiteStore } from 'hooks/useSiteStore'

import { Wordmark } from 'components/Global/Wordmark'
import { HomeGallery } from './HomeGallery'
import { usePathname } from 'next/navigation'

export default function HomePage(props) {
  const { images } = props
  const { loading, hasLoaded } = useSiteStore()

  const path = usePathname()

  if (loading && !hasLoaded) return null

  return (
    <div className="fixed inset-0 flex h-screen w-full flex-col justify-end gap-10 px-20 md:relative md:block md:px-0">
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
        <HomeGallery images={images} />
      </div>
      <div className="h-auto w-full py-20 md:hidden">
        <Wordmark className="h-auto w-full" />
      </div>
    </div>
  )
}
