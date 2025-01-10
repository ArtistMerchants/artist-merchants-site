import { useSiteStore } from 'hooks/useSiteStore'

import { AMStar } from './AMStar'
import { easeInOutExpo } from 'lib/animation'

const Transition = {
  duration: 0.75,
  ease: easeInOutExpo,
}

export const MenuButton = () => {
  const { menuOpen, setMenuOpen } = useSiteStore()

  return (
    <div className="relative">
      <button
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
      </div>
    </div>
  )
}
