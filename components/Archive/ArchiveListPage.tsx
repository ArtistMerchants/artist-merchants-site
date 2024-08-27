import { useMemo } from 'react'
import { useArchiveStore } from 'hooks/useArchiveStore'
import { AnimatePresence, motion } from 'framer-motion'
import { ProjectList } from 'components/Projects/ProjectList'
import { Wordmark } from 'components/Global/Wordmark'

export const ArchiveListPage = ({ projects }) => {
  const { activeCategory } = useArchiveStore()

  const filteredProjects = useMemo(() => {
    if (!activeCategory || activeCategory === 'all') {
      return projects
    }
    return projects.filter((project) =>
      project.categories.find((category) => category.slug === activeCategory)
    )
  }, [projects, activeCategory])

  return (
    <div className="flex w-full flex-col gap-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="site-grid w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProjectList projects={filteredProjects} />
        </motion.div>
      </AnimatePresence>
      <div className="site-grid">
        <Wordmark className="h-auto w-full md:col-span-3 md:col-start-2" />
      </div>
    </div>
  )
}
