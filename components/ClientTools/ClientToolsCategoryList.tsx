import { useClientToolsStore } from 'hooks/useClientToolsStore'
import Link from 'next/link'

export const ClientToolsCategoryList = ({
  materials = [],
}: {
  materials: any[]
}) => {
  const { setActiveMaterial, activeMaterial } = useClientToolsStore()

  return (
    <ul className="group flex flex-col items-start">
      {materials.map((material: any, index) => {
        const isActive = !activeMaterial
          ? index === 0
          : activeMaterial === material.slug
        const activeClass = isActive
          ? 'opacity-100'
          : 'opacity-50 hover:opacity-100'
        return (
          <li
            key={material._id}
            className={`ease transition-opacity duration-300 ${activeClass}`}
          >
            <Link
              href={`/client-tools`}
              onClick={() => setActiveMaterial(material.slug)}
            >
              {material.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
