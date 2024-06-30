import { useEffect } from 'react'
import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { useFilteredProjects } from './useFilteredProjects'
import { useArchiveStore } from 'hooks/useArchiveStore'
import { useSiteStore } from 'hooks/useSiteStore'

import { AnimatePresence, motion } from 'framer-motion'
import { ClientToolsProjectCard } from './ClientToolsProjectCard'

export const ClientToolsProjectList = ({ projects = [] }) => {
  const { view } = useArchiveStore()
  const { menuOpen } = useSiteStore()
  const { setProjects } = useClientToolsStore()

  const filteredProjects = useFilteredProjects({ projects })

  useEffect(() => {
    setProjects(filteredProjects)
  }, [filteredProjects])

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.section
        key={filteredProjects?.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className={`grid ${
          view === 'two'
            ? 'grid-cols-1'
            : menuOpen
            ? 'grid-cols-2'
            : 'grid-cols-4'
        } gap-10`}
      >
        {filteredProjects?.map((project: any) => {
          return (
            <ClientToolsProjectCard
              key={project._id}
              {...project}
              id={project._id}
            />
          )
        })}
      </motion.section>
    </AnimatePresence>
  )
}
