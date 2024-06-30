import { create } from 'zustand'

type ClientToolsStoreProps = {
  materials: string[]
  toggleMaterial: (material: string) => void
  techniques: string[]
  toggleTechnique: (technique: string) => void
  projects: any[]
  setProjects: (projects: any[]) => void
  materialLabel: string
  setMaterialLabel: (label: string) => void
}

export const useClientToolsStore = create<ClientToolsStoreProps>((set) => ({
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
  materialLabel: '',
  setMaterialLabel: (label) => set({ materialLabel: label }),
}))
