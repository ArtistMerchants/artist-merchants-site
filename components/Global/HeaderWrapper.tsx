import { useMemo, useRef } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'

import Link from 'next/link'
import { Logo } from './Logo'
import { useRouter } from 'next/router'

export const HeaderWrapper = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { setMenuOpen, menuOpen } = useSiteStore()

  const isGatedRoute = useMemo(() => {
    return (
      router.route === '/archive/[slug]' ||
      router.route === '/archive/categories/[slug]' ||
      router.route === '/client-tools/[slug]'
    )
  }, [router.route])

  return (
    <header
      className={`relative left-0 top-0 z-[2] flex w-full items-start justify-between gap-20 pl-20 pt-20 text-body md:grid md:w-[calc(calc(100%/9)*4)] md:grid-cols-4 md:gap-10 md:pl-32 md:pt-32`}
      ref={headerRef}
    >
      <div aria-hidden className="w-40"></div>
      <Link
        className="fixed left-20 top-20 md:left-32 md:top-32"
        href="/"
        aria-hidden
        onClick={() => setMenuOpen(false)}
      >
        <Logo className="h-auto w-40 md:w-52" />
      </Link>
      <nav
        className={`grid w-full grid-cols-2 gap-10 [--y-from:-20px] md:col-span-3 md:grid-cols-3 md:[--y-from:-50px]`}
      >
        {children}
      </nav>
      {/* <div className="relative right-20 text-right md:fixed md:right-32 md:top-32">
        <MenuButton />
      </div> */}
    </header>
  )
}
