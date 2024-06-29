import { client } from 'lib/sanity.client'
import { useNextSanityImage } from 'next-sanity-image'

export const useImage = (image, options = {}): any => {
  const imageProps = useNextSanityImage(client, image, options)
  return imageProps
}
