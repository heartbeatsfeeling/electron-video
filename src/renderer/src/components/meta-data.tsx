import { FileServices, FileServicesDialog } from '@/config/enum'
import Avatar from '@mui/material/Avatar'
import CloudUploadSharpIcon from '@mui/icons-material/CloudUploadSharp'
import useMainStore from '@renderer/store'

export default function MetaData () {
  const mainStore = useMainStore()
  async function handleFile () {
    const filePath = await window.electron.ipcRenderer.invoke(FileServicesDialog.select_file)
    if (filePath) {
      mainStore.setBuilding(true)
      const res = await window.electron.ipcRenderer.invoke(FileServices.decodeFile, filePath)
      console.log(res.duration)
      if (res) {
        mainStore.setVideoPath(res.video)
        mainStore.setImage(res.image)
        mainStore.setBgImage(res.bgImage)
        mainStore.setDuration(res.duration)
      }
      mainStore.setBuilding(false)
    }
  }
  return (
    <div className='text-center upload-area'>
      <Avatar
        sx={{ width: 36, height: 36 }}
        className='has-file'
        onClick={handleFile}
        src={mainStore.image ? mainStore.image : undefined}
      >
        <CloudUploadSharpIcon />
      </Avatar>
    </div>
  )
}
