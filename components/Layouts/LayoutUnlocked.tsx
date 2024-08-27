import { Loading } from '../Loading/Loading'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { SiteMeta } from '../SiteMeta'
import { HeaderUnlocked } from '../Header/HeaderUnlocked'

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
        <HeaderUnlocked {...settings} />
      </div>
      <SiteMeta {...settings} />
      <Loading images={settings?.images} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="relative md:col-span-9"
      >
        {children}
      </motion.main>
    </div>
  )
}
