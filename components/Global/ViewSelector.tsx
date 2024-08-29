import { FC, useCallback } from 'react'
import { useArchiveStore } from 'hooks/useArchiveStore'
import { motion } from 'framer-motion'

import { DownloadLink } from 'components/ClientTools/DownloadLink'
import { HeaderTab } from 'components/Header/HeaderTab'

type ViewSelectorProps = {
  withDownload?: boolean
}

export const ViewSelector: FC<ViewSelectorProps> = ({
  withDownload = false,
}) => {
  const { view: currentView, setView } = useArchiveStore()

  const activeClass = useCallback(
    (view: 'single' | 'multi') => {
      if (view === currentView) return 'opacity-100'

      return 'opacity-50 hover:opacity-100'
    },
    [currentView]
  )

  return (
    <HeaderTab className="col-span-1 col-start-2 row-span-1 row-start-1 md:order-none md:col-start-3">
      <ul className="flex flex-col">
        <li>
          <button
            onClick={() => setView('single')}
            aria-selected={currentView === 'single'}
            className={`ease transition-opacity duration-300 ${activeClass(
              'single'
            )}`}
          >
            Single View
          </button>
        </li>
        <li>
          <button
            onClick={() => setView('multi')}
            aria-selected={currentView === 'multi'}
            className={`ease transition-opacity duration-300 ${activeClass(
              'multi'
            )}`}
          >
            Multi View
          </button>
        </li>
        {withDownload && <DownloadLink className="pt-10 md:hidden" />}
      </ul>
    </HeaderTab>
  )
}
