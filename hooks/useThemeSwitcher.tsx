import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const useThemeSwitcher = () => {
  const path = usePathname()

  useEffect(() => {
    const lockedPaths = ['/login', '/']
    const unlocked = !lockedPaths.includes(path ?? '')

    if (unlocked) {
      document.body.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.body.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [path])

  return null
}
