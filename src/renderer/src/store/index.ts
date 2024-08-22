import { create } from 'zustand'

interface State {
  building: boolean
  bgImage: string
  videoPath: string
  setBuilding: (f: boolean) => void
}
const useMainStore = create<State>((set) => ({
  bgImage: '',
  videoPath: '',
  building: false,
  setBuilding: (f) => set((state) => ({ building: f }))
}))
export default useMainStore
