import { useClientToolsStore } from 'hooks/useClientToolsStore'

import { AnimatePresence, motion } from 'framer-motion'
import { Checkbox } from 'components/Global/Checkbox'
import { DownloadLink } from './DownloadLink'
import { HeaderTab } from 'components/Header/HeaderTab'

export const ClientToolsFilters = ({ materials, techniques }) => {
  const {
    activeMaterial,
    materials: activeMaterials,
    techniques: activeTechniques,
    toggleMaterial,
    toggleTechnique,
  } = useClientToolsStore((state) => state)

  const handleMaterialChange = (material) => toggleMaterial(material)
  const handleTechniqueChange = (technique) => toggleTechnique(technique)

  return (
    <HeaderTab className="col-span-2 col-start-1 row-start-3 gap-8 pb-32 pt-8 md:col-span-3 md:row-start-2 md:pt-[100px]">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          className="grid w-full grid-cols-2 gap-8 md:grid-cols-3"
          key={activeMaterial}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex h-fit flex-col items-start gap-14 md:gap-20">
            <h3 className="text-caption uppercase">Material</h3>
            <ul className="flex flex-col gap-3">
              {materials?.map((material, index) => (
                <div key={`${index}-${material}`}>
                  <Checkbox
                    label={material}
                    value={material}
                    onChange={handleMaterialChange}
                    checked={activeMaterials.includes(material)}
                  />
                </div>
              ))}
            </ul>
          </div>
          <div className="flex h-fit flex-col items-start gap-14 md:gap-20">
            <h3 className="text-caption uppercase">Technique</h3>
            <ul className="flex flex-col gap-3">
              {techniques?.map((technique, index) => (
                <div key={`${index}-${technique}`}>
                  <Checkbox
                    label={technique}
                    value={technique}
                    onChange={handleTechniqueChange}
                    checked={activeTechniques.includes(technique)}
                  />
                </div>
              ))}
            </ul>
          </div>
          <DownloadLink className="hidden md:block" />
        </motion.div>
      </AnimatePresence>
    </HeaderTab>
  )
}
