import { useArchiveStore } from 'hooks/useArchiveStore'
import { useSiteStore } from 'hooks/useSiteStore'

import { ProjectCard } from './ProjectCard'
import { useMemo } from 'react'

export const ProjectList = ({ projects = [] }) => {
  const { view } = useArchiveStore()
  const { menuOpen } = useSiteStore()

  const gridClass = useMemo(() => {
    if (view === 'two') {
      return menuOpen ? 'grid-cols-2 md:grid-cols-1' : 'grid-cols-2'
    }
    return menuOpen ? 'grid-cols-4 md:grid-cols-2' : 'grid-cols-4'
  }, [view, menuOpen])

  return (
    <section className={`grid ${gridClass} gap-4 md:gap-10`}>
      {projects?.map((project: any) => {
        return (
          <ProjectCard
            listIndex={0}
            key={project._id}
            {...project}
            id={project._id}
          />
        )
      })}
      {projects?.map((project: any) => {
        return (
          <ProjectCard
            listIndex={1}
            key={project._id}
            {...project}
            id={project._id}
          />
        )
      })}
      {projects?.map((project: any) => {
        return (
          <ProjectCard
            listIndex={2}
            key={project._id}
            {...project}
            id={project._id}
          />
        )
      })}
      {projects?.map((project: any) => {
        return (
          <ProjectCard
            listIndex={3}
            key={project._id}
            {...project}
            id={project._id}
          />
        )
      })}
      {projects?.map((project: any) => {
        return (
          <ProjectCard
            listIndex={4}
            key={project._id}
            {...project}
            id={project._id}
          />
        )
      })}
      {projects?.map((project: any) => {
        return (
          <ProjectCard
            listIndex={5}
            key={project._id}
            {...project}
            id={project._id}
          />
        )
      })}
      {projects?.map((project: any) => {
        return (
          <ProjectCard
            listIndex={6}
            key={project._id}
            {...project}
            id={project._id}
          />
        )
      })}
    </section>
  )
}
