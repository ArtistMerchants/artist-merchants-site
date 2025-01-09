import { useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'

import { motion } from 'framer-motion'

import { Wordmark } from 'components/Global/Wordmark'
import { usePathname } from 'next/navigation'
import { MenuButton } from 'components/Global/MenuButton'
import { HomeMenu } from './HomeMenu'
import {
  easeOutExpo,
  easeInCubic,
  easeInExpo,
  easeInOutExpo,
} from 'lib/animation'

export default function HomePage(props) {
  const { loading, hasLoaded, menuOpen } = useSiteStore()

  const path = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      document.body.classList.add('overflow-hidden')

      return () => {
        document.body.classList.remove('overflow-hidden')
      }
    }
  }, [])

  if (loading && !hasLoaded) return null

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex w-full items-center justify-between p-20">
        <div>LA, CA</div>
        <div>{new Date().getFullYear()}</div>
      </header>
      <motion.div
        className="flex w-full flex-1 transform-gpu items-center justify-center p-32 will-change-auto"
        initial={{
          opacity: menuOpen ? 0.25 : 1,
          scale: menuOpen ? 0.975 : 1,
          filter: menuOpen ? 'blur(14px)' : 'blur(0px)',
        }}
        animate={{
          opacity: menuOpen ? 0.25 : 1,
          scale: menuOpen ? 0.975 : 1,
          filter: menuOpen ? 'blur(14px)' : 'blur(0px)',
        }}
        transition={{
          duration: menuOpen ? 0.85 : 1.55,
          ease: menuOpen ? easeInOutExpo : easeOutExpo,
          delay: !menuOpen ? 0.35 : 0,
        }}
      >
        <Wordmark className="h-auto w-full max-w-[900px]" />
      </motion.div>
      <div className="flex items-center justify-center p-20 pb-32">
        <HomeMenu />
        <MenuButton />
      </div>
      {/* <div
        className={`
          ease-global ml-auto aspect-[2/2.5] h-auto w-full origin-bottom transition-[transform,opacity] duration-[450ms] md:aspect-[unset] md:h-full md:w-[90%]
          ${
            path === '/'
              ? 'scale-100 opacity-100'
              : 'scale-[0.98] opacity-0 md:scale-100 md:opacity-100'
          }
        `}
      >
        <HomeGallery images={images.filter((image) => !image.hide)} />
      </div>
      <div className="h-auto w-full py-20 md:hidden">
        <Wordmark className="h-auto w-full" />
      </div> */}
    </div>
  )
}
