import { useArchiveStore } from 'hooks/useArchiveStore'
import { useSiteStore } from 'hooks/useSiteStore'

import { ProjectCard } from './ProjectCard'

export const ProjectList = ({ projects = [] }) => {
  const { view } = useArchiveStore()
  const { menuOpen } = useSiteStore()
  return (
    <section
      className={`grid ${
        view === 'two'
          ? 'grid-cols-1'
          : menuOpen
          ? 'grid-cols-4 md:grid-cols-2'
          : 'grid-cols-4'
      } gap-4 md:gap-10`}
    >
      {projects?.map((project: any) => {
        return <ProjectCard key={project._id} {...project} id={project._id} />
      })}
    </section>
  )
}
