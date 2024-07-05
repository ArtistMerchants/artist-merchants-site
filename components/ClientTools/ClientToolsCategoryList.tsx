import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSiteStore } from 'hooks/useSiteStore'

export const ClientToolsCategoryList = ({
  materials = [],
  closeOnClick = true,
}) => {
  const path = usePathname()
  const { setMenuOpen } = useSiteStore()

  const handleLinkClick = () => {
    if (closeOnClick) {
      setMenuOpen(false)
    }
  }

  return (
    <ul className="group flex flex-col items-start">
      {materials.map((material: any) => {
        const isActive = path
          ?.replaceAll('client-tools', '')
          .includes(material.slug)
        const activeClass = isActive
          ? 'opacity-100'
          : path !== '/archive'
          ? 'opacity-60 hover:opacity-100'
          : 'group-hover:opacity-50 group-hover:hover:opacity-100'
        return (
          <li
            key={material._id}
            className={`ease transition-opacity duration-300 ${activeClass}`}
          >
            <Link
              onClick={handleLinkClick}
              href={`/client-tools/${material.slug}`}
            >
              {material.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
