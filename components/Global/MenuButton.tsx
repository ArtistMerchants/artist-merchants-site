import { useLenis } from '@studio-freight/react-lenis'
import { useSiteStore } from 'hooks/useSiteStore'

export const MenuButton = () => {
  const { menuOpen, setMenuOpen } = useSiteStore()
  const lenis = useLenis()

  const handleClick = () => {
    if (typeof window !== 'undefined' && !menuOpen) {
      lenis?.scrollTo(0)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    setMenuOpen(!menuOpen)
  }

  return (
    <button
      className={`ease transform-gpu tracking-4 transition-opacity duration-300 will-change-auto hover:opacity-100 active:opacity-100 ${
        menuOpen ? 'opacity-100' : 'opacity-50'
      }`}
      onClick={handleClick}
    >
      Menu
    </button>
  )
}
