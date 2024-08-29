import { useContext } from 'react'
import { useStore } from 'zustand'

import type { ClientToolsStoreState } from './createClientToolsStore'
import { ClientToolsContext } from 'components/ClientTools/ClientTools.context'

export const useClientToolsStore = (
  selector: (state: ClientToolsStoreState) => any
) => {
  const store = useContext(ClientToolsContext)
  if (!store) throw new Error('Missing ClientToolsContext.Provider in the tree')
  return useStore(store, selector)
}
