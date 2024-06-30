import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { Checkbox } from 'components/Global/Checkbox'
import { ClientToolsPDF } from './ClientToolsPDF'
import { usePDF } from '@react-pdf/renderer'
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
  const handleMaterialChange = (material) => toggleMaterial(material)
  const handleTechniqueChange = (technique) => toggleTechnique(technique)
  const [instance, updateInstance] = usePDF()

  const handleDownloadClick = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.navigator.msSaveBlob) {
      // @ts-ignore
      window.navigator.msSaveBlob(instance.blob, fileName)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      updateInstance(
        <ClientToolsPDF
          projects={projects}
          materials={activeMaterials}
          techniques={activeTechniques}
          title={activeMaterial?.title}
        />
      )
    }, 750)
  }, [])

  return (
    <div className="transform-gpu will-change-auto md:col-span-3 md:grid md:grid-cols-3 md:pt-[100px]">
      <div className="flex flex-col items-start gap-10">
        <h3 className="text-10 uppercase tracking-[0.06em]">Materials</h3>
        <ul className="flex flex-col">
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
        <h3 className="text-10 uppercase tracking-[0.06em]">Techniques</h3>
        <ul className="flex flex-col">
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
        <a
          href={instance.url ?? '#'}
          download="am-mood-board.pdf"
          onClick={handleDownloadClick}
          className="underline-offset-3 underline"
        >
          Download PDF
        </a>
        {/* <PDFDownloadLink
          document={
            <ClientToolsPDF
              projects={projects}
              materials={activeMaterials}
              techniques={activeTechniques}
              title={activeMaterial?.title}
            />
          }
          fileName="am-mood-board.pdf"
          className="underline-offset-3 underline will-change-auto transform-gpu"
        >
          Download PDF
        </PDFDownloadLink> */}
      </div>
    </div>
  )
}
