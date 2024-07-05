import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSiteStore } from 'hooks/useSiteStore'

export const ArchiveCategoryList = ({
  categories = [],
  activeCategories = [],
  closeOnClick = false,
  className = '',
}) => {
  const path = usePathname()
  const { setMenuOpen } = useSiteStore()

  const handleLinkClick = () => {
    if (closeOnClick) {
      setMenuOpen(false)
    }
  }

  return (
    <ul className={`${className} group flex flex-col items-start`}>
      <li
        className={`ease transition-opacity duration-300 ${
          path?.includes('all')
            ? 'opacity-100'
            : path !== '/archive'
            ? 'opacity-60 hover:opacity-100'
            : 'group-hover:opacity-50 group-hover:hover:opacity-100'
        }`}
      >
        <Link onClick={handleLinkClick} href="/archive/categories/all">
          All
        </Link>
      </li>
      {categories.map((category: any) => {
        const isActive = path
          ?.replaceAll('archive/categories', '')
          .includes(category.slug)
        const activeClass =
          isActive ||
          activeCategories.find((c: any) => c.slug === category.slug)
            ? 'opacity-100'
            : path !== '/archive'
            ? 'opacity-60 hover:opacity-100'
            : 'group-hover:opacity-50 group-hover:hover:opacity-100'
        return (
          <li
            key={category._id}
            className={`ease transition-opacity duration-300 ${activeClass}`}
          >
            <Link
              onClick={handleLinkClick}
              href={`/archive/categories/${category.slug}`}
            >
              {category.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
