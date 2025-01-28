import { useSiteStore } from 'hooks/useSiteStore'

import { AMStar } from './AMStar'
import { easeInOutExpo } from 'lib/animation'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback } from 'react'

const Transition = {
  duration: 0.75,
  ease: easeInOutExpo,
}

export const MenuButton = () => {
  const { menuOpen, setMenuOpen, menuActiveItem, setMenuActiveItem } =
    useSiteStore()

  const handleButtonClick = useCallback(() => {
    if (menuOpen && menuActiveItem !== null) {
      setMenuActiveItem(null)
    } else {
      setMenuOpen(!menuOpen)
    }
  }, [menuOpen, menuActiveItem, setMenuActiveItem, setMenuOpen])

  return (
    <div className="relative">
      <button
        onClick={handleButtonClick}
        className={`
          ease grid h-50 w-50 transform-gpu place-items-center rounded-full border-1 border-solid text-9 uppercase transition-colors duration-300 will-change-auto
          focus:outline-none focus-visible:border-[#888888] [&_*]:col-span-1 [&_*]:col-start-1 [&_*]:row-span-2 [&_*]:row-start-1
          ${
            menuOpen
              ? 'border-[#888888]'
              : 'border-[#444444] hover:border-[#888888] active:border-[#888888]'
          }
        `}
      >
        <AnimatePresence mode="wait">
          {menuOpen && menuActiveItem === null ? (
            <MenuText label="Close" />
          ) : null}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {menuOpen && menuActiveItem !== null ? (
            <MenuText label="Back" />
          ) : null}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {!menuOpen ? <MenuText label="Menu" /> : null}
        </AnimatePresence>
      </button>
      {/* <button
        className="ease relative flex origin-center scale-100 flex-col gap-6 transition-all duration-300 hover:scale-105 active:scale-95"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="sr-only">Menu</span>
        <div className="flex w-full items-center justify-between gap-6">
          <AMStar />
          <AMStar
            initial={{ y: 0 }}
            animate={{ y: menuOpen ? 8 : 0, x: menuOpen ? 8 : 0 }}
            transition={Transition}
          />
          <AMStar />
        </div>
        <div className="flex w-full items-center justify-center gap-6">
          <AMStar
            initial={{ y: 0 }}
            animate={{ y: menuOpen ? -7 : 0, x: menuOpen ? 0 : 0 }}
            transition={Transition}
          />
          <AMStar
            initial={{ y: 0 }}
            animate={{ y: menuOpen ? 7 : 0, x: menuOpen ? 0 : 0 }}
            transition={Transition}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-6">
          <AMStar />
          <AMStar
            initial={{ y: 0 }}
            animate={{ y: menuOpen ? -8 : 0, x: menuOpen ? -8 : 0 }}
            transition={Transition}
          />
          <AMStar />
        </div>
      </button>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 transform-gpu will-change-auto">
        <AMStar
          initial={{ scale: 0 }}
          animate={{ scale: menuOpen ? 1 : 0 }}
          transition={Transition}
        />
      </div> */}
    </div>
  )
}

const MenuText = ({ label }: { label: string }) => {
  return (
    <motion.div key={label} className="relative overflow-hidden">
      <motion.span
        className="block"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={Transition}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}
