import { useRef, useEffect, useMemo } from 'react'
import { useClientToolsStore } from 'hooks/useClientToolsStore'

import { AnimatePresence, motion } from 'framer-motion'
import { useArchiveStore } from 'hooks/useArchiveStore'
import { ClientToolsProjectList } from './ClientToolsProjectList'
import { Wordmark } from 'components/Global/Wordmark'

export const ClientToolsListPage = (props) => {
  const { materials, activeMaterial, projects, settings } = props

  const {
    materials: activeMaterials,
    techniques: activeTechniques,
    setMaterialLabel,
  } = useClientToolsStore()

  useEffect(() => {
    setMaterialLabel(activeMaterial?.title)
  }, [activeMaterial])

  // ease: [0.22, 0.81, 0.13, 0.98],

  return (
    <div className="flex w-full flex-col gap-20">
      <div className="site-grid w-full">
        <ClientToolsProjectList projects={projects} />
      </div>
      <div className="site-grid">
        <Wordmark className="h-auto w-full md:col-span-3 md:col-start-2" />
      </div>
    </div>
  )
}
