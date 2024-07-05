import { useState, useEffect } from 'react'

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Check if window is defined (i.e., we are in the browser)
    if (typeof window !== 'undefined') {
      handleResize() // Set initial value
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [breakpoint])

  return isMobile
}
