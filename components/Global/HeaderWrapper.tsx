import { useMemo, useRef } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Logo } from './Logo'
import { MenuButton } from './MenuButton'
import { useRouter } from 'next/router'

export const HeaderWrapper = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { setMenuOpen, menuOpen } = useSiteStore()

  const isRelative = useMemo(() => {
    return (
      router.route === '/archive/[slug]' ||
      router.route === '/archive/categories/[slug]' ||
      router.route === '/client-tools/[slug]'
    )
  }, [router.route])

  return (
    <header
      className={`${
        isRelative ? 'relative md:absolute' : 'absolute'
      } left-0 top-0 z-[2] flex w-full items-start justify-between gap-20 pl-20 pt-20 text-body md:grid md:w-[calc(calc(100%/9)*4)] md:grid-cols-4 md:gap-10 md:pl-32 md:pt-32`}
      ref={headerRef}
    >
      <Link href="/" aria-hidden onClick={() => setMenuOpen(false)}>
        <Logo className="h-auto w-40 md:w-52" />
      </Link>
      <motion.nav
        className={`grid w-full grid-cols-2 gap-10 [--y-from:-20px] md:col-span-3 md:grid-cols-3 md:[--y-from:-50px] ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{
          opacity: menuOpen ? 1 : 0,
          y: menuOpen ? 0 : 'var(--y-from)',
          height: menuOpen ? 'auto' : 150,
        }}
        animate={{
          opacity: menuOpen ? 1 : 0,
          y: menuOpen ? 0 : 'var(--y-from)',
          height: menuOpen ? 'auto' : 150,
        }}
        transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
      >
        {children}
      </motion.nav>
      <div className="relative right-20 text-right md:fixed md:right-32 md:top-32">
        <MenuButton />
      </div>
    </header>
  )
}
