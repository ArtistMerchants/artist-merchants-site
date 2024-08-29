import { useMemo } from 'react'
import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { useFilteredProjects } from 'components/ClientTools/useFilteredProjects'

import { AnimatePresence, motion } from 'framer-motion'
import { ClientToolsProjectList } from './ClientToolsProjectList'
import { Wordmark } from 'components/Global/Wordmark'

export const ClientToolsListPage = ({ projects }) => {
  const activeMaterial = useClientToolsStore((state) => state.activeMaterial)

  const projectsWithCurrentMaterial = useMemo(() => {
    if (!activeMaterial) {
      return projects
    }

    const filtered = projects.filter((project) => {
      return project.materials.find(
        (material) => material.slug === activeMaterial
      )
    })

    return filtered
  }, [projects, activeMaterial])

  const filteredProjects = useFilteredProjects({
    projects: projectsWithCurrentMaterial,
  })

  return (
    <div className="flex w-full flex-col gap-20">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="site-grid w-full"
          key={`${activeMaterial}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.39 }}
        >
          <ClientToolsProjectList projects={filteredProjects} />
        </motion.div>
      </AnimatePresence>
      <div className="site-grid">
        <Wordmark className="h-auto w-full md:col-span-3 md:col-start-2" />
      </div>
    </div>
  )
}
