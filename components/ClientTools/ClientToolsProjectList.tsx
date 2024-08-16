import { useEffect, useMemo } from 'react'
import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { useFilteredProjects } from './useFilteredProjects'
import { useArchiveStore } from 'hooks/useArchiveStore'
import { useSiteStore } from 'hooks/useSiteStore'

import { AnimatePresence, motion } from 'framer-motion'
import { ProjectCard } from 'components/Projects/ProjectCard'

export const ClientToolsProjectList = ({ projects = [] }) => {
  const { view } = useArchiveStore()
  const { menuOpen } = useSiteStore()
  const { setProjects } = useClientToolsStore()

  const filteredProjects = useFilteredProjects({ projects })

  useEffect(() => {
    setProjects(filteredProjects)
  }, [filteredProjects])

  const gridClass = useMemo(() => {
    if (view === 'single') {
      return 'grid-cols-1'
    }

    return 'grid-cols-3 md:grid-cols-4'
  }, [view, menuOpen])

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.section
        key={filteredProjects?.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className={`grid ${gridClass} gap-4 md:gap-10`}
      >
        {filteredProjects?.map((project: any) => {
          return (
            <ProjectCard
              listIndex={0}
              key={project._id}
              {...project}
              id={project._id}
            />
          )
        })}
        {filteredProjects?.map((project: any) => {
          return (
            <ProjectCard
              listIndex={1}
              key={project._id}
              {...project}
              id={project._id}
            />
          )
        })}
        {filteredProjects?.map((project: any) => {
          return (
            <ProjectCard
              listIndex={2}
              key={project._id}
              {...project}
              id={project._id}
            />
          )
        })}
        {filteredProjects?.map((project: any) => {
          return (
            <ProjectCard
              listIndex={3}
              key={project._id}
              {...project}
              id={project._id}
            />
          )
        })}
        {filteredProjects?.map((project: any) => {
          return (
            <ProjectCard
              listIndex={4}
              key={project._id}
              {...project}
              id={project._id}
            />
          )
        })}
        {filteredProjects?.map((project: any) => {
          return (
            <ProjectCard
              listIndex={5}
              key={project._id}
              {...project}
              id={project._id}
            />
          )
        })}
        {filteredProjects?.map((project: any) => {
          return (
            <ProjectCard
              listIndex={6}
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
