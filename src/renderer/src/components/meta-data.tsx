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
      const videoUrl = URL.createObjectURL(new Blob([res.video], { type: 'application/octet-stream' }))
      const imageUrl = URL.createObjectURL(new Blob(res.image, { type: 'image/jpg' }))
      const bgImageUrl = URL.createObjectURL(new Blob([res.bgImage], { type: 'application/octet-stream' }))
      console.log(
        imageUrl
      )
      mainStore.setBuilding(false)
    }
  }
  return (
    <div className='text-center upload-area'>
      <Avatar
        sx={{ width: 36, height: 36 }}
        className='has-file'
        onClick={handleFile}
      >
        <CloudUploadSharpIcon />
      </Avatar>
    </div>
  )
}
