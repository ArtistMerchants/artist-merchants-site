import React from 'react'

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main"
      className="absolute left-[-9999px] top-4 z-50 bg-white px-4 py-2 text-black transition-[left] focus:left-4"
    >
      Skip to main content
    </a>
  )
}
