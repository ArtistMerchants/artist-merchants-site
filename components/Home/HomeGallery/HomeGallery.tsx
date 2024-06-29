import { useRef, useState, useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'

import { HomeGalleryMasked } from './HomeGalleryMasked'

export const HomeGallery = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { unlocked } = useSiteStore()
  const ref = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((activeIndex + 1) % images.length)
    }, 6000)

    return () => {
      clearTimeout(intervalRef.current)
    }
  }, [images, activeIndex])

  return (
    <div ref={ref} className="relative h-full w-full">
      <HomeGalleryMasked
        activeIndex={activeIndex}
        images={images}
        isActive={!unlocked}
        eventSource={ref}
      />
    </div>
  )
}
