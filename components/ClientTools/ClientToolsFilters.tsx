import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { Checkbox } from 'components/Global/Checkbox'
import { ClientToolsPDF } from './ClientToolsPDF'
import { PDFDownloadLink } from '@react-pdf/renderer'

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

  return (
    <div className="md:col-span-3 md:grid md:grid-cols-3 md:pt-[100px]">
      <div className="flex flex-col items-start gap-10">
        <h3 className="text-10 uppercase tracking-[0.06em]">Materials</h3>
        <ul className="flex flex-col">
          {materials.map((material) => (
            <Checkbox
              key={material}
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
          {techniques.map((technique) => (
            <Checkbox
              key={technique}
              label={technique}
              value={technique}
              onChange={handleTechniqueChange}
              checked={activeTechniques.includes(technique)}
            />
          ))}
        </ul>
      </div>
      <div>
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
          className="underline-offset-3 underline"
        >
          Download PDF
        </PDFDownloadLink>
      </div>
    </div>
  )
}
