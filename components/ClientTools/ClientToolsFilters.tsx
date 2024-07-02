import { useState } from 'react'
import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { Checkbox } from 'components/Global/Checkbox'
import { useEffect } from 'react'
import { DownloadLink } from './DownloadLink'

export const ClientToolsFilters = ({ materials, techniques }) => {
  const {
    materials: activeMaterials,
    techniques: activeTechniques,
    toggleMaterial,
    toggleTechnique,
  } = useClientToolsStore()
  const [loaded, setLoaded] = useState(false)
  const handleMaterialChange = (material) => toggleMaterial(material)
  const handleTechniqueChange = (technique) => toggleTechnique(technique)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 750)
  }, [])

  return (
    <div className="order-4 col-span-2 col-start-1 grid transform-gpu grid-cols-2 gap-8 pt-8 will-change-auto md:col-span-3 md:grid-cols-3 md:pt-[100px]">
      <div className="flex flex-col items-start gap-10">
        <h3 className="text-caption uppercase">Material</h3>
        <ul className="flex flex-col gap-3">
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
        <h3 className="text-caption uppercase">Technique</h3>
        <ul className="flex flex-col gap-3">
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
      <DownloadLink className="hidden md:block" />
    </div>
  )
}
