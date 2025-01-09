import { useSiteStore } from 'hooks/useSiteStore'

import { AnimatePresence, motion } from 'framer-motion'
import { easeInOutQuart } from 'lib/animation'

export const HomeMenu = () => {
  const { menuOpen } = useSiteStore()

  return (
    <AnimatePresence mode="wait">
      {menuOpen ? (
        <motion.nav className="z-100 fixed inset-0 flex h-full w-full flex-col items-center justify-center gap-[12vh] p-32 text-center font-serif text-[24px]">
          <motion.button
            initial={{ y: 8, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -8, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.75, ease: easeInOutQuart, delay: 0 }}
          >
            Archive
          </motion.button>
          <motion.button
            initial={{ y: 8, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -8, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.75, ease: easeInOutQuart, delay: 0.05 }}
          >
            Information
          </motion.button>
          <motion.button
            initial={{ y: 8, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -8, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.75, ease: easeInOutQuart, delay: 0.1 }}
          >
            Contact
          </motion.button>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  )
}
