import { FC, useCallback } from 'react'
import { useArchiveStore } from 'hooks/useArchiveStore'
import { motion } from 'framer-motion'

import { DownloadLink } from 'components/ClientTools/DownloadLink'

type ViewSelectorProps = {
  withDownload?: boolean
}

export const ViewSelector: FC<ViewSelectorProps> = ({
  withDownload = false,
}) => {
  const { view: currentView, setView } = useArchiveStore()

  const activeClass = useCallback(
    (view: 'one' | 'two') => {
      if (view === currentView) return 'opacity-100'

      return 'opacity-50 hover:opacity-100'
    },
    [currentView]
  )

  return (
    <motion.ul
      className="order-1 flex flex-col md:order-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <li>
        <button
          onClick={() => setView('one')}
          aria-selected={currentView === 'one'}
          className={`ease transition-opacity duration-300 ${activeClass(
            'one'
          )}`}
        >
          View 1
        </button>
      </li>
      <li>
        <button
          onClick={() => setView('two')}
          aria-selected={currentView === 'two'}
          className={`ease transition-opacity duration-300 ${activeClass(
            'two'
          )}`}
        >
          View 2
        </button>
      </li>
      {withDownload && <DownloadLink className="pt-10 md:hidden" />}
    </motion.ul>
  )
}
