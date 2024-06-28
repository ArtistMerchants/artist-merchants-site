import { client } from 'lib/sanity.client'
import { useNextSanityImage } from 'next-sanity-image'

export const useImage = (image): any => {
  const imageProps = useNextSanityImage(client, image)
  return imageProps
}
