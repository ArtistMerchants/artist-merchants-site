import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SiteStoreProps = {
  loading: boolean
  setLoading: (loading: boolean) => void
  hasLoaded: boolean
  setHasLoaded: (hasLoaded: boolean) => void
  homeData: any
  setHomeData: (homeData: any) => void
  settings?: any
  setSettings: (settings: any) => void
  menuOpen: boolean
  setMenuOpen: (menuOpen: boolean) => void
  setMenuActiveItem: (menuActiveItem: string | null) => void
  menuActiveItem: string | null
}

export const useSiteStore = create<SiteStoreProps>()(
  persist(
    (set) => ({
      loading: true,
      setLoading: (loading) => set({ loading }),
      hasLoaded: false,
      setHasLoaded: (hasLoaded) => set({ hasLoaded }),
      homeData: {},
      setHomeData: (homeData) => set({ homeData }),
      settings: {},
      setSettings: (settings) => set({ settings }),
      menuOpen: false,
      setMenuOpen: (menuOpen) => set({ menuOpen }),
      menuActiveItem: null,
      setMenuActiveItem: (menuActiveItem) => set({ menuActiveItem }),
    }),
    {
      name: 'site-store',
      partialize: (state) => ({
        settings: state.settings,
      }),
    }
  )
)
