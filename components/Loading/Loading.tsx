import { usePreloadImages } from 'hooks/usePreloadImages'
import { useAuthStore } from 'hooks/useAuthStore'
import { useSiteStore } from 'hooks/useSiteStore'
import { urlForImage } from 'lib/sanity.image'

import { AnimatePresence, motion } from 'framer-motion'
import { LoadingLogo } from './LoadingLogo'

export const Loading = ({ images = [] }) => {
  const { unlocked } = useAuthStore()
  const { loading, hasLoaded } = useSiteStore()

  const imageUrls = images.map((image) => urlForImage(image).url())
  const isLoaded = usePreloadImages(imageUrls)

  if (unlocked || hasLoaded) return null

  return (
    <AnimatePresence initial={true}>
      {loading && (
        <motion.div
          initial={{ opacity: loading ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="fixed inset-0 z-[9999] flex h-full w-full items-center justify-center bg-black text-white"
        >
          <motion.div
            className="absolute flex h-[80px] w-[50vh] items-center justify-center md:h-[200px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingLogo isLoaded={isLoaded} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
