import { useCallback } from 'react'
import { useArchiveStore } from 'hooks/useArchiveStore'

export const ArchiveViewSelector = () => {
  const { view: currentView, setView } = useArchiveStore()

  const activeClass = useCallback(
    (view: 'one' | 'two') => {
      if (view === currentView) return 'opacity-100'

      return 'opacity-50 hover:opacity-100'
    },
    [currentView]
  )

  return (
    <ul className="flex flex-col">
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
    </ul>
  )
}
