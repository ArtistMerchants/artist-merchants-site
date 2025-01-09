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
    <button
      className="relative flex flex-col gap-8"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span className="sr-only">Menu</span>
      <div className="flex w-full items-center justify-between gap-8">
        <AMStar />
        <AMStar
          initial={{ y: 0 }}
          animate={{ y: menuOpen ? 12 : 0, x: menuOpen ? 9 : 0 }}
          transition={Transition}
        />
        <AMStar />
      </div>
      <div className="flex w-full items-center justify-center gap-8">
        <AMStar
          initial={{ y: 0 }}
          animate={{ y: menuOpen ? -9.5 : 0, x: menuOpen ? 1 : 0 }}
          transition={Transition}
        />
        <AMStar
          initial={{ y: 0 }}
          animate={{ y: menuOpen ? 9.5 : 0, x: menuOpen ? -1 : 0 }}
          transition={Transition}
        />
      </div>
      <div className="flex w-full items-center justify-between gap-8">
        <AMStar />
        <AMStar
          initial={{ y: 0 }}
          animate={{ y: menuOpen ? -11 : 0, x: menuOpen ? -9 : 0 }}
          transition={Transition}
        />
        <AMStar />
      </div>
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 transform-gpu">
        <AMStar
          initial={{ scale: 0 }}
          animate={{ scale: menuOpen ? 1 : 0 }}
          transition={Transition}
        />
      </div> */}
    </button>
  )
}
