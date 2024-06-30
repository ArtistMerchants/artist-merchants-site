import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SiteStoreProps = {
  menuOpen: boolean
  setMenuOpen: (menuOpen: boolean) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  hasLoaded: boolean
  setHasLoaded: (hasLoaded: boolean) => void
  unlocked: boolean
  setUnlocked: (unlocked: boolean) => void
  homeData: any
  setHomeData: (homeData: any) => void
  settings?: any
  setSettings: (settings: any) => void
}

export const useSiteStore = create<SiteStoreProps>()(
  persist(
    (set) => ({
      menuOpen: false,
      setMenuOpen: (menuOpen) => set({ menuOpen }),
      loading: true,
      setLoading: (loading) => set({ loading }),
      hasLoaded: false,
      setHasLoaded: (hasLoaded) => set({ hasLoaded }),
      unlocked: false,
      setUnlocked: (unlocked) => set({ unlocked }),
      homeData: {},
      setHomeData: (homeData) => set({ homeData }),
      settings: {},
      setSettings: (settings) => set({ settings }),
    }),
    {
      name: 'site-store',
      partialize: (state) => ({
        loading: state.loading,
        hasLoaded: state.hasLoaded,
        settings: state.settings,
        unlocked: state.unlocked,
      }),
    }
  )
)
