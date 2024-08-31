import { useFormValue } from 'sanity'
import createImageUrlBuilder from '@sanity/image-url'
import { useMemo, useEffect, useState } from 'react'
import { useClient } from 'sanity'

export const ImagePreview = (props) => {
  const [filename, setFilename] = useState(null)
  const { media, title } = props

  const allMedia = useFormValue(['media']) as any[]

  const imageIndex = useMemo(() => {
    return (
      allMedia?.findIndex((item) => item?.asset?._ref === media?._ref) ?? -1
    )
  }, [allMedia, media])

  const client = useClient({ apiVersion: '2021-03-25' })

  const imageUrlBuilder = useMemo(() => createImageUrlBuilder(client), [client])

  const imgSrc = useMemo(() => {
    return media?._ref && imageUrlBuilder.image(media?._ref).width(500).url()
  }, [media?._ref, imageUrlBuilder])

  useEffect(() => {
    if (media?._ref) {
      client
        .fetch(`*[_id == $ref][0].originalFilename`, { ref: media?._ref })
        .then((res) => {
          setFilename(res)
        })
        .catch(console.error)
    }
  }, [media?._ref, client])

  const subtitle = useMemo(() => {
    switch (imageIndex) {
      case 0:
        return 'This will be the first image in the PDF download'
      case 1:
        return 'This will be the second image in the PDF download'
      case 2:
        return 'This will be the third image in the PDF download'
      default:
        return ''
    }
  }, [imageIndex])

  if (!imgSrc) {
    return null
  }

  const newProps = {
    ...props,
    title: title ?? filename ?? 'Image',
    subtitle: subtitle,
    media: <img src={imgSrc} />,
  }

  return props.renderDefault(newProps)
}
