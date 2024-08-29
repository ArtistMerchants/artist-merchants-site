import { useMemo, useState } from 'react'
import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { useSiteStore } from 'hooks/useSiteStore'
import { urlForImage } from 'lib/sanity.image'

export const DownloadLink = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { projects } = useClientToolsStore((state) => state)
  const { settings } = useSiteStore()

  const filename = settings?.downloadFilename || 'artist-merchants-reference'

  const projectObject = useMemo(() => {
    return projects.map((project) => {
      return {
        ...project,
        media: project.media.map((media, index) => {
          if (index > 2) return null
          return {
            url: urlForImage(media)
              .width(1200)
              .quality(95)
              .format('jpg')
              .bg('ffffff')
              .url(),
          }
        }),
      }
    })
  }, [projects])

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/download-reference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projects: projectObject, filename }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const blob = await response.blob()
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `${filename}.pdf`
      link.click()
      link.remove()
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`text-body ${className}`}>
      <button
        disabled={isLoading || !projects || projects?.length <= 0}
        onClick={handleDownload}
        className="underline-offset-3 ease underline transition-opacity duration-300 disabled:opacity-50"
      >
        {isLoading ? 'Downloading...' : 'Download PDF'}
      </button>
    </div>
  )
}
