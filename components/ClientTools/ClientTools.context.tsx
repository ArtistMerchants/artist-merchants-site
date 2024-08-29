import { createContext } from 'react'
import { ClientToolsStoreProps } from 'hooks/useClientToolsStore'

export const ClientToolsContext = createContext<ClientToolsStoreProps | null>(
  null
)
