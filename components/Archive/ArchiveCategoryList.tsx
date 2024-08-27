import { usePathname } from 'next/navigation'
import { useArchiveStore } from 'hooks/useArchiveStore'

import Link from 'next/link'

export const ArchiveCategoryList = ({
  categories = [],
  activeCategories = [],
  className = '',
}) => {
  const path = usePathname()
  const { activeCategory, setActiveCategory } = useArchiveStore()

  return (
    <ul className={`${className} group flex flex-col items-start`}>
      <li
        className={`ease transition-opacity duration-300 ${
          activeCategory === 'all'
            ? 'opacity-100'
            : activeCategory !== 'all'
            ? 'opacity-60 hover:opacity-100'
            : 'group-hover:opacity-50 group-hover:hover:opacity-100'
        }`}
      >
        <Link href={`/archive`} onClick={() => setActiveCategory('all')}>
          All
        </Link>
      </li>
      {categories.map((category: any) => {
        const isActive = activeCategory === category.slug
        const activeClass =
          isActive ||
          activeCategories.find((c: any) => c.slug === category.slug)
            ? 'opacity-100'
            : 'opacity-60 hover:opacity-100'
        return (
          <li
            key={category._id}
            className={`ease transition-opacity duration-300 ${activeClass}`}
          >
            <Link
              href={`/archive`}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
