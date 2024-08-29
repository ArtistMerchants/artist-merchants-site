import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export const useAuthStore = () => {
  const path = usePathname()

  const checkIfUnlocked = () => {
    const lockedPaths = ['/login', '/']
    if (!path) return false

    return !lockedPaths.includes(path)
  }

  const [isUnlocked, setIsUnlocked] = useState<boolean>(checkIfUnlocked())

  useEffect(() => {
    setIsUnlocked(checkIfUnlocked())
  }, [path])

  return { unlocked: isUnlocked }
}
