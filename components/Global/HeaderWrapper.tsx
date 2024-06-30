import { useSiteStore } from 'hooks/useSiteStore'

import Link from 'next/link'
import { Logo } from './Logo'
import { MenuButton } from './MenuButton'

export const HeaderWrapper = ({ children }) => {
  const { setMenuOpen } = useSiteStore()

  return (
    <div className="absolute left-0 top-32 z-[2] flex w-full items-start justify-between gap-20 md:block">
      <Link
        href="/"
        className="inline-block md:hidden"
        onClick={() => setMenuOpen(false)}
      >
        <Logo className="h-auto w-40 md:w-52" />
      </Link>
      {children}
      <div>
        <MenuButton />
      </div>
    </div>
  )
}
