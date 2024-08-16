import { motion } from 'framer-motion'

import { PortableText } from '@portabletext/react'

export const HomeDescription = ({ content }) => {
  return (
    <div className="relative hyphens-auto font-serif text-large-heading leading-[70%] [--y-to:-20vh] md:[--y-to:-40vh]">
      Artist Merchants
      <span className="relative -top-20 text-large-heading-sup">®</span>
    </div>
  )
}
