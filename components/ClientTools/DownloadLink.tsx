import { useEffect, useState } from 'react'
import { useClientToolsStore } from 'hooks/useClientToolsStore'

import { ClientToolsPDF } from './ClientToolsPDF'
import { PDFDownloadLink } from '@react-pdf/renderer'

export const DownloadLink = ({ className = '' }) => {
  const [loaded, setLoaded] = useState(false)
  const {
    materials: activeMaterials,
    techniques: activeTechniques,
    materialLabel,
    projects,
  } = useClientToolsStore()

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 750)
  }, [])

  return (
    <div className={`text-13 leading-120 md:text-14 ${className}`}>
      {loaded ? (
        <PDFDownloadLink
          document={
            <ClientToolsPDF
              projects={projects}
              materials={activeMaterials}
              techniques={activeTechniques}
              title={materialLabel}
            />
          }
          fileName="am-mood-board.pdf"
          className="underline-offset-3 transform-gpu underline will-change-auto"
        >
          Download PDF
        </PDFDownloadLink>
      ) : (
        <span className="underline-offset-3 underline">Download PDF</span>
      )}
    </div>
  )
}
