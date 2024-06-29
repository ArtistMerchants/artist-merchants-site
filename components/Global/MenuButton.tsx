import { useSiteStore } from 'hooks/useSiteStore'

export const MenuButton = () => {
  const { menuOpen, setMenuOpen } = useSiteStore()
  return (
    <button
      className={`ease transform-gpu tracking-4 transition-opacity duration-300 will-change-auto hover:opacity-100 active:opacity-100 ${
        menuOpen ? 'opacity-100' : 'opacity-50'
      }`}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      Menu
    </button>
  )
}
