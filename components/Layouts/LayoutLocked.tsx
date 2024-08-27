import { FC } from 'react'

import { motion } from 'framer-motion'
import { Loading } from '../Loading/Loading'
import { SiteMeta } from '../SiteMeta'
import { HeaderLocked } from 'components/Header/HeaderLocked'
import { Wordmark } from 'components/Global/Wordmark'

interface LayoutLockedProps {
  children: React.ReactNode
  settings: any
  route: string
}

export const LayoutLocked: FC<LayoutLockedProps> = ({ children, settings }) => {
  return (
    <div className="site-grid min-h-screen gap-y-60 text-body md:gap-y-0">
      <SiteMeta {...settings} />
      <Loading images={settings?.images} />
      <div className="flex flex-col justify-between md:col-span-3 md:col-start-2">
        <HeaderLocked {...settings} />
        <Wordmark className="hidden h-auto w-full md:block" />
      </div>
      <motion.main
        className="md:col-span-4 md:col-start-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.main>
    </div>
  )
}
