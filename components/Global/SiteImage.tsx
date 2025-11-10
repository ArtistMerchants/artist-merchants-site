import React from 'react'
import { urlForImage } from 'lib/sanity.image'

interface SiteImageProps {
  image: any
  sizes: string
  fit?: 'cover' | 'contain'
}

export const SiteImage: React.FC<SiteImageProps> = ({
  image,
  sizes,
  fit = 'cover',
}) => {
  if (!image?.asset) return null

  const srcSet = `
    ${urlForImage(image).width(320).auto('format').quality(95).url()} 320w,
    ${urlForImage(image).width(480).auto('format').quality(95).url()} 480w,
    ${urlForImage(image).width(800).auto('format').quality(95).url()} 800w,
    ${urlForImage(image).width(1200).auto('format').quality(95).url()} 1200w,
    ${urlForImage(image).width(1600).auto('format').quality(95).url()} 1600w,
    ${urlForImage(image).width(2000).auto('format').quality(95).url()} 2000w
  `

  const src = urlForImage(image).width(300).url()

  return (
    <img
      src={src}
      srcSet={srcSet}
      alt={image.alt}
      sizes={sizes}
      style={{ objectFit: fit }}
      className="absolute inset-0 h-full w-full transform-gpu mix-blend-darken will-change-auto"
    />
  )
}
