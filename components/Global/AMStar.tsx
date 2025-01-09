import { motion } from 'framer-motion'

export const AMStar = (props) => {
  return (
    <motion.div
      className="relative h-12 w-12 transform-gpu will-change-transform"
      {...props}
    >
      <svg
        className="h-full w-full"
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M0 201.4L150 216.7L99 299L101 301L183.3 250L198.6 400H201.4L216.7 250L299 301L301 299L250 216.7L400 201.4V198.6L250 183.3L301 101L299 99L216.7 150L201.4 0H198.6L183.3 150L101 99L99 101L150 183.3L0 198.6V201.4Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  )
}
