import { useClientToolsStore } from 'hooks/useClientToolsStore'

import { motion } from 'framer-motion'
import { Checkbox } from 'components/Global/Checkbox'
import { DownloadLink } from './DownloadLink'

export const ClientToolsFilters = ({ materials, techniques }) => {
  const {
    materials: activeMaterials,
    techniques: activeTechniques,
    toggleMaterial,
    toggleTechnique,
  } = useClientToolsStore()

  const handleMaterialChange = (material) => toggleMaterial(material)
  const handleTechniqueChange = (technique) => toggleTechnique(technique)

  return (
    <motion.div
      className="order-4 col-span-2 col-start-1 grid transform-gpu grid-cols-2 gap-8 pt-8 will-change-auto md:col-span-3 md:grid-cols-3 md:pt-[100px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-start gap-14 md:gap-20">
        <h3 className="text-caption uppercase">Material</h3>
        <ul className="flex flex-col gap-3">
          {materials?.map((material, index) => (
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
      <div className="flex flex-col items-start gap-14 md:gap-20">
        <h3 className="text-caption uppercase">Technique</h3>
        <ul className="flex flex-col gap-3">
          {techniques?.map((technique, index) => (
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
    </motion.div>
  )
}
