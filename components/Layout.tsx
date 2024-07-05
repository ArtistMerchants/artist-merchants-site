import { useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { Loading } from './Loading/Loading'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { Header } from './Header'
import { SiteMeta } from './SiteMeta'

interface LayoutProps {
  children: React.ReactNode
  settings: any
  route: string
}

export const Layout: FC<LayoutProps> = ({ children, route, settings }) => {
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

  return (
    <>
      <SiteMeta {...settings} />
      <Loading images={settings?.images} />
      <Header {...settings} />
      <main className="ease relative z-[1] min-h-screen px-20 text-body md:grid md:grid-cols-9 md:px-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="relative md:col-span-8 md:col-start-2"
        >
          {children}
        </motion.div>
      </main>
    </>
  )
}
