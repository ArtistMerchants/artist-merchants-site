import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SiteStoreProps = {
  menuOpen: boolean
  setMenuOpen: (menuOpen: boolean) => void
  unlocked: boolean
  setUnlocked: (unlocked: boolean) => void
  homeData: any
  setHomeData: (homeData: any) => void
}

export const useSiteStore = create<SiteStoreProps>()(
  persist(
    (set) => ({
      menuOpen: false,
      setMenuOpen: (menuOpen) => set({ menuOpen }),
      unlocked: false,
      setUnlocked: (unlocked) => set({ unlocked }),
      homeData: {},
      setHomeData: (homeData) => set({ homeData }),
    }),
    {
      name: 'site-store',
      partialize: (state) => ({
        unlocked: state.unlocked,
      }),
    }
  )
)
