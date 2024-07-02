import { useEffect } from 'react'
import { usePDF } from '@react-pdf/renderer'
import { ClientToolsPDF } from 'components/ClientTools/ClientToolsPDF'
import { useClientToolsStore } from 'hooks/useClientToolsStore'

export const SetPdfLink = () => {
  const { materials, techniques, materialLabel, projects, setPdfDownloadLink } =
    useClientToolsStore()
  const [instance, setInstance] = usePDF({
    document: (
      <ClientToolsPDF
        projects={projects}
        materials={materials}
        techniques={techniques}
        title={materialLabel}
      />
    ),
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    setInstance(
      <ClientToolsPDF
        projects={projects}
        materials={materials}
        techniques={techniques}
        title={materialLabel}
      />
    )
  }, [projects, materials, techniques, materialLabel])

  useEffect(() => {
    if (instance.url) {
      setPdfDownloadLink(instance.url)
    }
  }, [instance.url])
  return null
}
