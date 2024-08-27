import { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'

type HeaderTabProps = {
  children: ReactNode
  className?: string
}

export const HeaderTab: FC<HeaderTabProps> = ({ children, className }) => {
  return (
    <motion.div
      className={`self-start ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      /**
       * This is hacky, but needs to be .01 shorter than the main layout transition
       * so layout doesn't shift because of elements with `layout` set
       */
      transition={{ duration: 0.49 }}
    >
      {children}
    </motion.div>
  )
}
