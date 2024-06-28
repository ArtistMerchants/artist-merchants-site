import { useCallback } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { usePathname } from 'next/navigation'

import Link from 'next/link'

export const Nav = () => {
  const { unlocked } = useSiteStore()
  const pathName = usePathname()

  const activeClass = useCallback(
    (path: string) => {
      if (path === pathName || pathName?.includes(path)) return 'opacity-100'

      if (pathName === '/') {
        return 'group-hover:opacity-50 group-hover:hover:opacity-100'
      }

      return 'opacity-50 hover:opacity-100'
    },
    [pathName]
  )

  return (
    <nav className="flex justify-start">
      <ul className="group flex flex-col items-start">
        <li>
          <Link
            href="/information"
            className={`ease transition-opacity duration-500 ${activeClass(
              '/information'
            )}`}
          >
            Information
          </Link>
        </li>
        <li>
          <Link
            href="/archive"
            className={`ease transition-opacity duration-500 ${activeClass(
              '/archive'
            )}`}
          >
            Archive
          </Link>
        </li>
        <li>
          {unlocked ? (
            <Link
              href="/client-tools"
              className={`ease transition-opacity duration-500 ${activeClass(
                '/client-tools'
              )}`}
            >
              Client Tools
            </Link>
          ) : (
            <div
              className={`cursor-not-allowed ${activeClass(
                '/client-tools'
              )} ease transition-opacity duration-300`}
            >
              Client Tools
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}
