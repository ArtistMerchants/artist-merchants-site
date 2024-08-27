import { create } from 'zustand'

type ViewTypes = 'single' | 'multi'

type ArchiveStoreProps = {
  view: ViewTypes
  setView: (view: ViewTypes) => void
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export const useArchiveStore = create<ArchiveStoreProps>((set) => ({
  view: 'multi',
  setView: (view) => set({ view }),
  activeCategory: 'all',
  setActiveCategory: (category) => set({ activeCategory: category }),
}))
