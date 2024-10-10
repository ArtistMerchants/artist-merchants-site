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
}

export const useSiteStore = create<SiteStoreProps>()(
  persist(
    (set) => ({
      loading: true,
      setLoading: (loading) => set({ loading }),
      hasLoaded: true,
      setHasLoaded: (hasLoaded) => set({ hasLoaded }),
      homeData: {},
      setHomeData: (homeData) => set({ homeData }),
      settings: {},
      setSettings: (settings) => set({ settings }),
    }),
    {
      name: 'site-store',
      partialize: (state) => ({
        settings: state.settings,
      }),
    }
  )
)
