import { create } from 'zustand'

interface State {
  building: boolean
  image: string
  bgImage: string
  videoPath: string
  originVideoPath: string
  duration: number
  setBuilding: (f: boolean) => void
  setDuration: (f: number) => void
  setBgImage: (f: string) => void
  setImage: (f: string) => void
  setVideoPath: (f: string) => void
  setOriginVideoPath: (f: string) => void
}
const useMainStore = create<State>((set) => ({
  bgImage: '',
  videoPath: '',
  originVideoPath: '',
  image: '',
  duration: 0,
  building: false,
  setBuilding: (f) => set(() => ({ building: f })),
  setDuration: (f) => set(() => ({ duration: f })),
  setBgImage: (f) => set(() => ({ bgImage: f })),
  setImage: (f) => set(() => ({ image: f })),
  setVideoPath: (f) => set(() => ({ videoPath: f })),
  setOriginVideoPath: (f) => set(() => ({ originVideoPath: f }))
}))
export default useMainStore
