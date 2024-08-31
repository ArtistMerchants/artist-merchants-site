import { useMemo } from 'react'
import { useArchiveStore } from 'hooks/useArchiveStore'

import { ProjectCard } from 'components/Projects/ProjectCard'

export const ClientToolsProjectList = ({
  projects = [],
}: {
  projects: any[]
}) => {
  const { view } = useArchiveStore()

  const gridClass = useMemo(() => {
    if (view === 'single') {
      return 'grid-cols-1'
    }

    return 'grid-cols-3 md:grid-cols-4'
  }, [view])

  return (
    <section
      className={`grid md:col-span-7 md:col-start-2 ${gridClass} gap-4 md:gap-10`}
    >
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
    </section>
  )
}
