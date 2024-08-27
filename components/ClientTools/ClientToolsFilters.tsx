import { useClientToolsStore } from 'hooks/useClientToolsStore'

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
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
  } = useClientToolsStore()

  const handleMaterialChange = (material) => toggleMaterial(material)
  const handleTechniqueChange = (technique) => toggleTechnique(technique)

  return (
    <HeaderTab className="col-span-2 col-start-1 row-start-3 grid grid-cols-2 gap-8 pb-32 pt-8 md:col-span-3 md:row-start-2 md:grid-cols-3 md:pt-[100px]">
      <motion.div className="flex h-fit flex-col items-start gap-14 md:gap-20">
        <h3 className="text-caption uppercase">Material</h3>
        <motion.ul className="flex flex-col gap-3">
          <AnimatePresence initial={false} mode="popLayout">
            {materials?.map((material, index) => (
              <motion.div
                layout
                key={`${activeMaterial}-${material}-${index}`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.3, delay: 0.15 },
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Checkbox
                  label={material}
                  value={material}
                  onChange={handleMaterialChange}
                  checked={activeMaterials.includes(material)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
      <motion.div className="flex h-fit flex-col items-start gap-14 md:gap-20">
        <h3 className="text-caption uppercase">Technique</h3>
        <motion.ul className="flex flex-col gap-3">
          <AnimatePresence initial={false} mode="popLayout">
            {techniques?.map((technique, index) => (
              <motion.div
                layout
                key={`${activeMaterial}-${technique}-${index}`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.3, delay: 0.15 },
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Checkbox
                  label={technique}
                  value={technique}
                  onChange={handleTechniqueChange}
                  checked={activeTechniques.includes(technique)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
      <DownloadLink className="hidden md:block" />
    </HeaderTab>
  )
}
