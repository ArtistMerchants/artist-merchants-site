import { useState, useMemo } from 'react'
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
      <h2 className="text-caption uppercase">{title}</h2>
      <ul className="group flex flex-col items-start">
        {items?.map((item, index) => (
          <FaqItem
            key={item._key}
            question={item.question}
            answer={item.answer}
            activeIndex={activeIndex}
            index={index}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </ul>
    </div>
  )
}

const FaqItem = ({ question, answer, activeIndex, index, onClick }) => {
  const activeClass = useMemo(() => {
    if (activeIndex === index) return 'opacity-100'

    if (activeIndex !== null && activeIndex !== index)
      return `opacity-50 group-hover:opacity-50 group-hover:hover:opacity-100`

    return 'group-hover:opacity-50 group-hover:hover:opacity-100'
  }, [activeIndex, index])

  return (
    <li className="relative w-full">
      <button
        className={`ease text-left transition-opacity duration-300 ${activeClass}`}
        aria-expanded={activeIndex === index}
        aria-controls={`faq-${handleize(question)}`}
        onClick={onClick}
      >
        {question}
      </button>
      <AnimatePresence>
        {activeIndex === index && (
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
