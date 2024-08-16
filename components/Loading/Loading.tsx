import { useEffect } from 'react'
import { usePreloadImages } from 'hooks/usePreloadImages'
import { useSiteStore } from 'hooks/useSiteStore'
import { urlForImage } from 'lib/sanity.image'

import { AnimatePresence, motion } from 'framer-motion'
import { LoadingLogo } from './LoadingLogo'

export const Loading = ({ images = [] }) => {
  const { loading, setLoading, hasLoaded, setHasLoaded, unlocked } =
    useSiteStore()

  const imageUrls = images.map((image) => urlForImage(image).url())
  const isLoaded = usePreloadImages(imageUrls)

  useEffect(() => {
    if (isLoaded) {
      setLoading(false)
      setTimeout(() => {
        setHasLoaded(true)
      }, 2000)
    }
  }, [isLoaded, setLoading, hasLoaded])

  if (unlocked || hasLoaded) return null

  return (
    <AnimatePresence initial={true}>
      {loading && (
        <motion.div
          initial={{ opacity: loading ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="fixed inset-0 z-[9999] flex h-full w-full items-center justify-center bg-black text-white will-change-auto"
        >
          <motion.div
            className="absolute flex h-[80px] w-[50vh] items-center justify-center md:h-[200px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingLogo />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
