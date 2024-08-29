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

  const skipFocusToTechniques = (e) => {
    e.preventDefault()
    const techniquesElement: HTMLInputElement | null =
      document.querySelector('#techniques a')
    if (techniquesElement) {
      techniquesElement.focus()
    }
  }

  const skipFocusToDownload = (e) => {
    e.preventDefault()

    const els = document.querySelectorAll('.download-link')
    els.forEach((el: HTMLButtonElement) => {
      const style = window.getComputedStyle(el)
      if (style.display !== 'none' && style.visibility !== 'hidden') {
        el.focus()
      }
    })
  }

  return (
    <HeaderTab className="col-span-2 col-start-1 row-start-3 gap-8 pb-32 pt-8 md:col-span-3 md:row-start-2 md:pt-[100px]">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          className="grid w-full grid-cols-2 gap-8 md:grid-cols-3"
          key={activeMaterial}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.39 }}
        >
          <div
            id="materials"
            className="relative flex h-fit flex-col items-start gap-14 md:gap-20"
          >
            <h3 className="text-caption uppercase">Material</h3>
            <a
              onClick={skipFocusToTechniques}
              href="#techniques"
              className="sr-only focus:not-sr-only focus:absolute focus:bottom-[calc(100%+12px)] focus:z-10 focus:w-fit focus:whitespace-nowrap focus:bg-white focus:p-2 focus:text-12 focus:text-[blue]"
            >
              Skip to techniques filters
            </a>
            <ul className="flex flex-col gap-3">
              {materials?.map((material, index) => (
                <li key={`${index}-${material}`}>
                  <Checkbox
                    label={material}
                    value={material}
                    onChange={handleMaterialChange}
                    checked={activeMaterials.includes(material)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div
            id="techniques"
            className="relative flex h-fit flex-col items-start gap-14 md:gap-20"
          >
            <h3 className="text-caption uppercase">Technique</h3>
            <a
              onClick={skipFocusToDownload}
              href="#download"
              className="sr-only focus:not-sr-only focus:absolute focus:bottom-[calc(100%+12px)] focus:z-10 focus:w-fit focus:whitespace-nowrap focus:bg-white focus:p-2 focus:text-12 focus:text-[blue]"
            >
              Skip to download
            </a>
            <ul className="flex flex-col gap-3">
              {techniques?.map((technique, index) => (
                <li key={`${index}-${technique}`}>
                  <Checkbox
                    label={technique}
                    value={technique}
                    onChange={handleTechniqueChange}
                    checked={activeTechniques.includes(technique)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <DownloadLink className="hidden md:block" />
        </motion.div>
      </AnimatePresence>
    </HeaderTab>
  )
}
