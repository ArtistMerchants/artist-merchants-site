import { motion } from 'framer-motion'

import { PortableText } from '@portabletext/react'

export const HomeDescription = ({ content, isActive = false }) => {
  return (
    <motion.div
      className="relative hyphens-auto font-serif text-large-heading leading-[70%] [--y-to:-20vh] md:[--y-to:-40vh]"
      initial={{ y: 0 }}
      animate={{ y: isActive ? 'var(--y-to)' : 0 }}
      transition={{ duration: 0.65, ease: [0.82, 0.01, 0.22, 0.98] }}
    >
      Artist Merchants
      <span className="relative -top-20 text-[clamp(20px,3vw,32px)]">®</span>
      <div
        className={`ease max-w-[500px] transition-opacity duration-700 ${
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
