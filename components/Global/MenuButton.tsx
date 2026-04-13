import { useSiteStore } from 'hooks/useSiteStore'

import { easeInOutExpo } from 'lib/animation'
import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { MenuIcon } from './MenuIcon'

const Transition = {
  duration: 0.75,
  ease: easeInOutExpo,
}

export const MenuButton = () => {
  const { menuOpen, setMenuOpen, menuActiveItem, setMenuActiveItem, hasLoaded } =
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
      <motion.button
        className={`
          ease relative flex h-55 w-55 origin-center flex-col gap-6 rounded-full border-[1px] border-solid p-4 transition-[border-color] duration-300
          ${
            menuOpen
              ? 'border-[#888888]'
              : 'border-[#444444] hover:border-[#888888] active:border-[#888888]'
          }
        `}
        onClick={handleButtonClick}
        initial={{
          scale: 0,
          boxShadow: 'inset 0 0 0 30px hsla(0, 0%, 100%, 0.25)',
        }}
        animate={{
          scale: hasLoaded ? 1 : 0,
          boxShadow: hasLoaded
            ? 'inset 0 0 0 0px hsla(0, 0%, 100%, 0.0)'
            : 'inset 0 0 0 30px hsla(0, 0%, 100%, 0.25)',
        }}
        transition={{
          duration: 1.333,
          ease: [0.075, 0.82, 0.165, 1],
        }}
      >
        <span className="sr-only">
          {menuOpen && menuActiveItem === null
            ? 'Close'
            : menuOpen && menuActiveItem !== null
            ? 'Back'
            : 'Menu'}
        </span>
        <motion.div
          className="h-full w-full"
          initial={{ scale: 0, opacity: 0.33 }}
          animate={{
            scale: hasLoaded ? 1 : 0,
            opacity: hasLoaded ? 1 : 0.33,
          }}
          transition={{
            duration: 1,
            ease: [0.075, 0.82, 0.165, 1],
          }}
        >
          <MenuIcon
            icon={
              menuOpen && menuActiveItem === null
                ? 'close'
                : menuOpen && menuActiveItem !== null
                ? 'back'
                : 'logo'
            }
          />
        </motion.div>
      </motion.button>
    </div>
  )
}
