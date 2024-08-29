import { useMemo, useEffect } from 'react'
import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { handleize } from 'lib/helpers'

type Project = {
  taggedMaterials: Array<{ label: string; items: string[] }>
  taggedTechniques: Array<{ label: string; items: string[] }>
}

export const useFilteredProjects = ({
  projects,
}: {
  projects: Project[]
}): Project[] => {
  const { activeMaterial, materials, techniques, setProjects } =
    useClientToolsStore((state) => state)

  const filteredProjects = useMemo(() => {
    if (materials.length === 0 && techniques.length === 0) return projects

    const filteredProjects = projects.filter((project) => {
      const projectMaterials = getTaggedItems(
        project.taggedMaterials,
        activeMaterial
      )
      const projectTechniques = getTaggedItems(
        project.taggedTechniques,
        activeMaterial
      )

      const hasTaggedMaterials = hasMatchingItems(projectMaterials, materials)
      const hasTaggedTechniques = hasMatchingItems(
        projectTechniques,
        techniques
      )

      if (materials.length > 0 && techniques.length === 0)
        return hasTaggedMaterials
      if (techniques.length > 0 && materials.length === 0)
        return hasTaggedTechniques

      return hasTaggedMaterials && hasTaggedTechniques
    })

    return filteredProjects
  }, [projects, materials, techniques, activeMaterial])

  useEffect(() => {
    setProjects(filteredProjects)
  }, [filteredProjects])

  return filteredProjects
}

const getTaggedItems = (
  taggedItems: Array<{ label: string; items: string[] }>,
  activeItem: string
): string[] => {
  return (
    taggedItems?.find((item) => handleize(item.label) === activeItem)?.items ??
    []
  )
}

const hasMatchingItems = (
  projectItems: string[],
  selectedItems: string[]
): boolean => {
  return projectItems.some((item) => selectedItems.includes(item))
}
