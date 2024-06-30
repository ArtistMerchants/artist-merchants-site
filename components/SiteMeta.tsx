import { urlForImage } from 'lib/sanity.image'
import Head from 'next/head'

export const SiteMeta = ({ title, description, ogImage, favicon }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1, maximum-scale=1"
      />
      {favicon && (
        <link rel="shortcut icon" href={urlForImage(favicon).url()} />
      )}
      {title && (
        <>
          <title>{title}</title>
          <meta key="og_title" property="og:title" content={title} />
          <meta key="twitter_title" name="twitter:title" content={title} />
        </>
      )}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta
            key="og_description"
            property="og:description"
            content={description}
          />
          <meta
            key="twitter_description"
            name="twitter:description"
            content={description}
          />
        </>
      )}
      {ogImage && (
        <>
          <meta
            key="twitter_card"
            name="twitter:card"
            content={'summary_large_image'}
          />
          <meta
            key="og_image"
            property="og:image"
            content={urlForImage(ogImage).width(1600).height(900).url()}
          />
          <meta
            key="twitter_image"
            name="twitter:image"
            content={urlForImage(ogImage).width(1600).height(900).url()}
          />
        </>
      )}
    </Head>
  )
}
