import { useState } from 'react'
import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { Checkbox } from 'components/Global/Checkbox'
import { ClientToolsPDF } from './ClientToolsPDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useEffect } from 'react'

export const ClientToolsFilters = ({
  materials,
  techniques,
  activeMaterial,
}) => {
  const {
    materials: activeMaterials,
    techniques: activeTechniques,
    toggleMaterial,
    toggleTechnique,
    projects,
  } = useClientToolsStore()
  const [loaded, setLoaded] = useState(false)
  const handleMaterialChange = (material) => toggleMaterial(material)
  const handleTechniqueChange = (technique) => toggleTechnique(technique)

  const handleDownloadClick = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.navigator.msSaveBlob) {
      // @ts-ignore
      window.navigator.msSaveBlob(instance.blob, fileName)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 750)
  }, [])

  return (
    <div className="grid transform-gpu grid-cols-2 pt-14 will-change-auto md:col-span-3 md:grid-cols-3 md:pt-[100px]">
      <div className="flex flex-col items-start gap-10">
        <h3 className="text-10 uppercase tracking-[0.06em]">Material</h3>
        <ul className="flex flex-col gap-2">
          {materials.map((material, index) => (
            <Checkbox
              key={`${material}-${index}`}
              label={material}
              value={material}
              onChange={handleMaterialChange}
              checked={activeMaterials.includes(material)}
            />
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-start gap-10">
        <h3 className="text-10 uppercase tracking-[0.06em]">Technique</h3>
        <ul className="flex flex-col gap-2">
          {techniques.map((technique, index) => (
            <Checkbox
              key={`${technique}-${index}`}
              label={technique}
              value={technique}
              onChange={handleTechniqueChange}
              checked={activeTechniques.includes(technique)}
            />
          ))}
        </ul>
      </div>
      <div>
        {loaded ? (
          <PDFDownloadLink
            document={
              <ClientToolsPDF
                projects={projects}
                materials={activeMaterials}
                techniques={activeTechniques}
                title={activeMaterial?.title}
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
    </div>
  )
}
