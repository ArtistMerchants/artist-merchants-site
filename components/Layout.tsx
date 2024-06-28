import { useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { usePathname } from 'next/navigation'
import { Logo } from './Global/Logo'
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
    } else {
      document.body.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [unlocked])
  return (
    <main className="ease relative z-[1] min-h-screen bg-white px-32 text-black transition-colors duration-1000 dark:bg-black dark:text-white md:grid md:grid-cols-9 md:gap-10">
      <Link
        href="/"
        className="col-span-1 py-32"
        onClick={() => setMenuOpen(false)}
      >
        <Logo className="h-auto w-52" />
      </Link>
      <div className="col-span-8">{children}</div>
    </main>
  )
}
