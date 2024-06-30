import React from 'react'
import { urlForImage } from 'lib/sanity.image'

interface SiteImageProps {
  image: any
  sizes: string
}

export const SiteImage: React.FC<SiteImageProps> = ({ image, sizes }) => {
  if (!image) return null

  const srcSet = `
    ${urlForImage(image).width(320).url()} 320w,
    ${urlForImage(image).width(480).url()} 480w,
    ${urlForImage(image).width(800).url()} 800w,
    ${urlForImage(image).width(1200).url()} 1200w,
    ${urlForImage(image).width(1600).url()} 1600w,
    ${urlForImage(image).width(2000).url()} 2000w
  `

  const src = urlForImage(image).width(800).url() // Default image URL

  return (
    <picture className="absolute inset-0 h-full w-full">
      <source srcSet={srcSet} sizes={sizes} />
      <img
        src={src}
        alt={image.alt}
        style={{ aspectRatio: image.aspectRatio }}
        className="h-full w-full transform-gpu object-contain mix-blend-darken will-change-auto"
      />
    </picture>
  )
}
