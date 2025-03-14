import { Loading } from '../Loading/Loading'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { SiteMeta } from '../SiteMeta'
import { HeaderUnlocked } from '../Header/HeaderUnlocked'
import Link from 'next/link'
import { Logo } from 'components/Global/Logo'

interface LayoutUnlockedProps {
  children: React.ReactNode
  settings: any
  route: string
}

export const LayoutUnlocked: FC<LayoutUnlockedProps> = ({
  children,
  settings,
}) => {
  return (
    <div className="min-h-screen gap-y-60 text-body md:gap-y-0">
      <div className="site-grid w-full">
        <Link
          href="/"
          className="absolute left-0 top-20 col-span-1 block pl-20 md:relative md:top-0"
        >
          <Logo className="h-auto w-full max-w-38 md:max-w-50" />
        </Link>
        <HeaderUnlocked {...settings} />
      </div>
      <SiteMeta {...settings} />
      <Loading />
      <motion.main
        id="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="relative md:col-span-9"
      >
        {children}
      </motion.main>
    </div>
  )
}
