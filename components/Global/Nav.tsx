import { useCallback } from 'react'
import { usePathname } from 'next/navigation'

import Link from 'next/link'
import { useAuthStore } from 'hooks/useAuthStore'

export const Nav = () => {
  const { unlocked } = useAuthStore()
  const pathName = usePathname()

  const activeClass = useCallback(
    (path: string) => {
      if (pathName === '/')
        return 'opacity-100 group-hover:opacity-50 group-hover:hover:opacity-100'
      if (path !== '/' && (path === pathName || pathName?.includes(path)))
        return 'opacity-100'

      return 'opacity-50 hover:opacity-100'
    },
    [pathName, unlocked]
  )

  return (
    <ul className="group flex flex-col items-start">
      {!unlocked ? (
        <li>
          <Link
            href={pathName === '/info' ? '/' : '/info'}
            className={`ease duration-350 inline-block py-1 transition-opacity ${activeClass(
              '/info'
            )}`}
          >
            Information
          </Link>
        </li>
      ) : null}
      <li>
        <Link
          href={unlocked ? '/archive' : pathName === '/login' ? '/' : '/login'}
          className={`ease duration-350 inline-block py-1 transition-opacity ${activeClass(
            unlocked ? '/archive' : '/login'
          )}`}
        >
          Archive
        </Link>
      </li>
      {unlocked ? (
        <li>
          <Link
            href={`/client-tools`}
            className={`ease duration-350 inline-block py-1 transition-opacity ${activeClass(
              '/client-tools'
            )}`}
          >
            Client Tools
          </Link>
        </li>
      ) : null}
    </ul>
  )
}
