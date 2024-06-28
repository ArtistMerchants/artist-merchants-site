import { motion } from 'framer-motion'

import { PortableText } from '@portabletext/react'

export const HomeDescription = ({ content, isActive = false }) => {
  return (
    <motion.div
      className="relative hyphens-auto font-serif text-[56px] leading-120"
      initial={{ y: 0 }}
      animate={{ y: isActive ? '-40vh' : 0 }}
      transition={{ duration: 0.65, ease: [0.82, 0.01, 0.22, 0.98] }}
    >
      Artist Merchants
      <span className="relative -top-20 text-[32px]">®</span>
      <span
        className={`ease transition-opacity duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <PortableText
          value={content}
          components={{
            block: {
              normal: ({ children }) => <p className="mb-40">{children}</p>,
            },
          }}
        />
      </span>
    </motion.div>
  )
}
