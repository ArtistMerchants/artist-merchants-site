import { useSiteStore } from 'hooks/useSiteStore'

import Link from 'next/link'
import { Logo } from './Logo'
import { MenuButton } from './MenuButton'

export const HeaderWrapper = ({ children, relative = false }) => {
  const { setMenuOpen } = useSiteStore()

  return (
    <div
      className={`${
        relative
          ? 'relative pt-20 md:absolute md:pt-0'
          : 'absolute left-0 top-20'
      } z-[2] flex w-full items-start justify-between gap-20 text-body md:top-32 md:block`}
    >
      <Link
        href="/"
        className="left-20 top-20 inline-block opacity-0 md:hidden"
        aria-hidden
        onClick={() => setMenuOpen(false)}
      >
        <Logo className="h-auto w-40 md:w-52" />
      </Link>
      {children}
      <div className="opacity-0 md:hidden" aria-hidden>
        <MenuButton />
      </div>
    </div>
  )
}
