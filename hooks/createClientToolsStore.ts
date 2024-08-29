import { createStore } from 'zustand'

export interface ClientToolsStoreProps {
  materials: string[]
  techniques: string[]
  projects: any[]
  activeMaterial: any
}

export interface ClientToolsStoreState extends ClientToolsStoreProps {
  toggleMaterial: (material: string) => void
  toggleTechnique: (technique: string) => void
  setProjects: (projects: any[]) => void
  setActiveMaterial: (material: any) => void
}

export type ClientToolsStore = ReturnType<typeof createClientToolsStore>

export const createClientToolsStore = (
  props?: Partial<ClientToolsStoreProps>
) => {
  return createStore<ClientToolsStoreState>((set) => ({
    materials: [],
    toggleMaterial: (material) =>
      set((state) =>
        state.materials.includes(material)
          ? { materials: state.materials.filter((m) => m !== material) }
          : { materials: [...state.materials, material] }
      ),
    techniques: [],
    toggleTechnique: (technique) =>
      set((state) =>
        state.techniques.includes(technique)
          ? { techniques: state.techniques.filter((t) => t !== technique) }
          : { techniques: [...state.techniques, technique] }
      ),
    projects: [],
    setProjects: (projects) => set({ projects }),
    activeMaterial: null,
    setActiveMaterial: (material) => set({ activeMaterial: material }),
    ...props,
  }))
}
