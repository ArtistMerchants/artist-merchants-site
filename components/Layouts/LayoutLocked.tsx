import { FC } from 'react'

import { motion } from 'framer-motion'
import { Loading } from '../Loading/Loading'
import { SiteMeta } from '../SiteMeta'

interface LayoutLockedProps {
  children: React.ReactNode
  settings: any
  route: string
}

export const LayoutLocked: FC<LayoutLockedProps> = ({ children, settings }) => {
  return (
    <div className="min-h-screen w-full text-body">
      <SiteMeta {...settings} />
      <Loading />
      <motion.main
        id="main"
        className="h-screen w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {children}
      </motion.main>
    </div>
  )
}
