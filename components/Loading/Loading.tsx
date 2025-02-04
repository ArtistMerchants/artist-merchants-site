import { useState } from 'react'
import { useAuthStore } from 'hooks/useAuthStore'
import { useSiteStore } from 'hooks/useSiteStore'

import { AnimatePresence, motion } from 'framer-motion'
import { LoadingLogo } from './LoadingLogo'
import { useEffect } from 'react'

export const Loading = ({ images = [] }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { unlocked } = useAuthStore()
  const { loading, hasLoaded } = useSiteStore()

  useEffect(() => {
    if (hasLoaded) {
      setIsLoaded(true)
      return
    }

    setTimeout(() => {
      setIsLoaded(true)
    }, 2000)
  }, [hasLoaded])

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
            className="absolute flex h-[80px] w-[50vh] items-center justify-center md:h-[130px]"
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
