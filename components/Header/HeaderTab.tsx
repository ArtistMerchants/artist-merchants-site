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
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  )
}
