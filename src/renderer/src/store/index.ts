import { create } from 'zustand'

interface State {
  building: boolean
  image: string
  bgImage: string
  videoPath: string
  originVideoPath: string
  duration: number
}
interface Action {
  setBuilding: (building: boolean) => void
  setDuration: (duration: number) => void
  setBgImage: (bgImage: string) => void
  setImage: (image: string) => void
  setVideoPath: (videoPath: string) => void
  setOriginVideoPath: (originVideoPath: string) => void
}
const useMainStore = create<State & Action>((set) => ({
  bgImage: '',
  videoPath: '',
  originVideoPath: '',
  image: '',
  duration: 0,
  building: false,
  setBuilding: (building) => set(() => ({ building })),
  setDuration: (duration) => set(() => ({ duration })),
  setBgImage: (bgImage) => set(() => ({ bgImage })),
  setImage: (image) => set(() => ({ image })),
  setVideoPath: (videoPath) => set(() => ({ videoPath })),
  setOriginVideoPath: (originVideoPath) => set(() => ({ originVideoPath }))
}))
export default useMainStore
