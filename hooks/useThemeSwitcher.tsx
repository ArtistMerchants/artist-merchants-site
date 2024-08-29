import { useEffect } from 'react'
import { useAuthStore } from 'hooks/useAuthStore'

export const useThemeSwitcher = () => {
  const { unlocked } = useAuthStore()

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
