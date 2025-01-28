import { useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'

import { easeOutExpo, easeInOutExpo } from 'lib/animation'
import { motion } from 'framer-motion'

import { Wordmark } from 'components/Global/Wordmark'
import { usePathname } from 'next/navigation'
import { MenuButton } from 'components/Global/MenuButton'
import { HomeMenu } from './HomeMenu'
import { HomeModel } from './HomeModel'

export default function HomePage(props) {
  const { description, contact, settings } = props
  const { loading, hasLoaded, menuOpen } = useSiteStore()

  console.log(props)

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
      <header className="flex h-80 w-full items-center justify-center p-20">
        <motion.div
          initial={{
            opacity: menuOpen ? 1 : 0,
            y: menuOpen ? 0 : 2,
          }}
          animate={{
            opacity: menuOpen ? 1 : 0,
            y: menuOpen ? 0 : 2,
          }}
          transition={{
            duration: 0.75,
            delay: menuOpen ? 0.25 : 0,
            ease: easeInOutExpo,
          }}
        >
          <Wordmark className="h-24 w-full" />
        </motion.div>
        {/* <div>LA, CA</div>
        <div>{new Date().getFullYear()}</div> */}
      </header>
      <motion.div className="relative flex w-full flex-1 transform-gpu items-center justify-center p-32 will-change-auto">
        <motion.div
          className="pointer-events-none relative z-[2] h-auto w-full max-w-[900px]"
          initial={{
            opacity: menuOpen ? 0 : 1,
            scale: menuOpen ? 0.975 : 1,
            filter: menuOpen ? 'blur(14px)' : 'blur(0px)',
          }}
          animate={{
            opacity: menuOpen ? 0 : 1,
            scale: menuOpen ? 0.975 : 1,
            filter: menuOpen ? 'blur(14px)' : 'blur(0px)',
          }}
          transition={{
            duration: menuOpen ? 0.85 : 1.55,
            ease: menuOpen ? easeInOutExpo : easeOutExpo,
            delay: !menuOpen ? 0.35 : 0,
          }}
        >
          <Wordmark className="h-auto w-full" />
        </motion.div>
        <HomeModel />
      </motion.div>
      <div className="relative z-[3] flex h-80 items-center justify-center p-20 pb-32">
        <HomeMenu
          description={description}
          contact={contact}
          information={settings?.information}
        />
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
