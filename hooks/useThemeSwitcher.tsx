import { useEffect } from 'react'
import { useSiteStore } from './useSiteStore'

export const useThemeSwitcher = () => {
  const { unlocked } = useSiteStore()

  useEffect(() => {
    if (unlocked) {
      document.body.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.body.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [unlocked])

  return null
}
