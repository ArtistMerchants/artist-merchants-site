import { useSiteStore } from 'hooks/useSiteStore'

import { Wordmark } from 'components/Global/Wordmark'
import { HomeGallery } from './HomeGallery'

export default function HomePage(props) {
  const { images } = props
  const { loading, hasLoaded } = useSiteStore()

  if (loading && !hasLoaded) return null

  return (
    <div className="flex h-full w-full flex-1 flex-col justify-between gap-20 md:block">
      <div className="ml-auto aspect-[2/2.5] h-full w-full md:aspect-[unset] md:w-[90%]">
        <HomeGallery images={images} />
      </div>
      <div className="h-auto w-full py-20 md:hidden">
        <Wordmark className="h-auto w-full" />
      </div>
    </div>
  )
}
