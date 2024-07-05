import { motion } from 'framer-motion'

import { PortableText } from '@portabletext/react'

export const HomeDescription = ({ content, isActive = false }) => {
  return (
    <motion.div
      className="relative hyphens-auto font-serif text-large-heading leading-[70%] [--y-to:-20vh] md:[--y-to:-40vh]"
      initial={{ y: 0 }}
      animate={{ y: isActive ? 'var(--y-to)' : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.81, 0.13, 0.98] }}
    >
      Artist Merchants
      <span className="relative -top-20 text-large-heading-sup">®</span>
      <div
        className={`ease ease transition-opacity duration-[600ms] ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <PortableText
          value={content}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="mb-40 leading-110">{children}</p>
              ),
            },
          }}
        />
      </div>
    </motion.div>
  )
}
