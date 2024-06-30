import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { handleize } from 'lib/helpers'

export const useFilteredProjects = ({ projects }): any[] => {
  const { materials, techniques } = useClientToolsStore()
  const path = usePathname()
  const label = useMemo(() => path?.replaceAll('/client-tools/', ''), [path])

  const filteredProjects: any[] = useMemo(() => {
    if (materials?.length === 0 && techniques?.length === 0) return projects

    return projects?.filter((project: any) => {
      const productMaterials =
        project.taggedMaterials?.find(
          (material: any) => handleize(material.label) === label
        )?.items ?? []
      const productTechniques =
        project.taggedTechniques?.find(
          (technique: any) => handleize(technique.label) === label
        )?.items ?? []

      const hasTaggedMaterials = productMaterials.some((material: any) =>
        materials.includes(material)
      )
      const hasTaggedTechniques = productTechniques.some((technique: any) =>
        techniques.includes(technique)
      )

      if (materials?.length >= 1 && techniques?.length <= 0)
        return hasTaggedMaterials
      if (techniques?.length >= 1 && materials?.length <= 0)
        return hasTaggedTechniques

      return hasTaggedMaterials && hasTaggedTechniques
    })

    return projects
  }, [projects, materials, techniques])

  return filteredProjects
}
