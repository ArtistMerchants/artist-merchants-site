import { useEffect, useMemo } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from './Global/Logo'
import { MenuButton } from './Global/MenuButton'
import { FC } from 'react'
import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const path = usePathname()
  const { unlocked, setMenuOpen } = useSiteStore()

  useEffect(() => {
    if (unlocked) {
      document.body.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.body.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [unlocked])

  const pageKey = useMemo(() => {
    if (path === '/information' || path === '/archive' || path === '/') {
      return 'home-multi'
    }

    return path
  }, [path])
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pageKey}
        className="ease relative z-[1] min-h-screen bg-white px-20 text-body text-black transition-colors duration-1000 dark:bg-black dark:text-white md:grid md:grid-cols-9 md:px-32"
      >
        <Link
          href="/"
          className="fixed left-20 top-20 z-[100] inline-block md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <Logo className="h-auto w-40 md:w-52" />
        </Link>
        <div className="fixed right-20 top-0 z-[100] py-20 md:hidden">
          <MenuButton />
        </div>
        <Link
          href="/"
          className="hidden py-20 md:col-span-1 md:inline-block md:py-32"
          onClick={() => setMenuOpen(false)}
        >
          <Logo className="h-auto w-40 md:w-52" />
        </Link>
        <motion.div
          className="relative md:col-span-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.main>
    </AnimatePresence>
  )
}
