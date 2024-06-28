import { useState, useCallback } from 'react'
import { handleize } from 'lib/helpers'

import { AnimatePresence, motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'

export const InformationFaqs = ({ title, items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  if (!title || !items) return null

  const handleItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-10 uppercase">{title}</h2>
      <ul className="group flex flex-col items-start text-14">
        {items?.map((item, index) => (
          <FaqItem
            key={item._key}
            question={item.question}
            answer={item.answer}
            isActive={index === activeIndex}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </ul>
    </div>
  )
}

const FaqItem = ({ question, answer, isActive, onClick }) => {
  const activeClass = useCallback(
    (isActive: boolean) => {
      if (isActive)
        return 'opacity-100 group-hover:opacity-60 group-hover:hover:opacity-100'

      return 'group-hover:opacity-60 group-hover:hover:opacity-100'
    },
    [isActive]
  )

  return (
    <li className="relative w-full">
      <button
        className={`ease text-left transition-opacity duration-300 ${activeClass(
          isActive
        )}`}
        aria-expanded={isActive}
        aria-controls={`faq-${handleize(question)}`}
        onClick={onClick}
      >
        {question}
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            id={`faq-${handleize(question)}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.8, 0.01, 0.11, 0.98] }}
            className="overflow-hidden"
          >
            <div className="py-10">
              <PortableText value={answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
