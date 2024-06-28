import { useArchiveStore } from 'hooks/useArchiveStore'
import { ProjectCard } from './ProjectCard'

export const ProjectList = ({ projects = [] }) => {
  const { view } = useArchiveStore()
  return (
    <section
      className={`grid ${
        view === 'one' ? 'grid-cols-2' : 'grid-cols-1'
      } gap-10`}
    >
      {projects?.map((project: any) => {
        return <ProjectCard key={project._id} {...project} id={project._id} />
      })}
    </section>
  )
}
