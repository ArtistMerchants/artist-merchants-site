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
        className={`
          ease relative flex h-55 w-55 origin-center flex-col gap-6 rounded-full border-[1px] border-solid p-4 transition-all duration-300
          ${
            menuOpen
              ? 'border-[#888888]'
              : 'border-[#444444] hover:border-[#888888] active:border-[#888888]'
          }
        `}
        onClick={handleButtonClick}
      >
        <span className="sr-only">
          {menuOpen && menuActiveItem === null
            ? 'Close'
            : menuOpen && menuActiveItem !== null
            ? 'Back'
            : 'Menu'}
        </span>
        <MenuIcon
          icon={
            menuOpen && menuActiveItem === null
              ? 'close'
              : menuOpen && menuActiveItem !== null
              ? 'back'
              : 'logo'
          }
        />
      </button>
    </div>
  )
}
