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
      } z-[2] flex w-full items-start justify-between gap-20 text-12 leading-120 md:top-32 md:block md:text-14`}
    >
      <Link
        href="/"
        className="fixed left-20 top-20 inline-block md:hidden"
        onClick={() => setMenuOpen(false)}
      >
        <Logo className="h-auto w-40 md:w-52" />
      </Link>
      <Link
        href="/"
        className="left-20 top-20 inline-block opacity-0 md:hidden"
        aria-hidden
        onClick={() => setMenuOpen(false)}
      >
        <Logo className="h-auto w-40 md:w-52" />
      </Link>
      {children}
      <div className="fixed right-20 top-20 md:hidden">
        <MenuButton />
      </div>
      <div className="opacity-0 md:hidden" aria-hidden>
        <MenuButton />
      </div>
    </div>
  )
}
