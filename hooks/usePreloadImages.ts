import { useState, useEffect } from 'react'

export const usePreloadImages = (imageUrls: string[], delay = 5000) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const preloadImages = (urls: string[]): Promise<void> => {
      return new Promise((resolve) => {
        let loadedCount = 0

        const onLoad = () => {
          loadedCount += 1
          if (loadedCount === urls.length) {
            resolve()
          }
        }

        urls.forEach((url) => {
          const img = new Image()
          img.src = url
          img.onload = onLoad
          img.onerror = onLoad
        })
      })
    }

    const loadImages = async () => {
      const preloadPromise = preloadImages(imageUrls)
      const delayPromise = new Promise((resolve) => setTimeout(resolve, delay))

      await Promise.all([preloadPromise, delayPromise])
      setIsLoaded(true)
    }

    loadImages()
  }, [imageUrls])

  return isLoaded
}
