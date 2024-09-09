import { usePathname } from 'next/navigation'

import { Nav } from '../Global/Nav'
import { AnimatePresence, motion } from 'framer-motion'
import { InfoHeader } from './InfoHeader'
import { HeaderTab } from './HeaderTab'
import { ArchiveForm } from 'components/Archive/ArchiveForm'

export const HeaderLocked = ({ information }) => {
  const path = usePathname()

  return (
    <header className="relative z-[10] flex flex-col gap-20 pl-55 md:grid md:grid-cols-3 md:gap-0 md:pl-0">
      <div className="col-span-1 flex flex-col gap-10">
        <Nav />
      </div>

      <motion.div className="col-span-2">
        <AnimatePresence mode="wait" initial={false}>
          {path === '/info' ? (
            <InfoHeader data={information} key="info" />
          ) : null}

          {path?.includes('/archive') || path === '/login' ? (
            <HeaderTab key="archive">
              <ArchiveForm />
            </HeaderTab>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
