import { create } from 'zustand'

type ViewTypes = 'one' | 'two'

type ArchiveStoreProps = {
  view: ViewTypes
  setView: (view: ViewTypes) => void
}

export const useArchiveStore = create<ArchiveStoreProps>((set) => ({
  view: 'one',
  setView: (view) => set({ view }),
}))
