import { ServicesDialog } from '@/config/enum'
import Avatar from '@mui/material/Avatar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import CloudUploadSharpIcon from '@mui/icons-material/CloudUploadSharp'

export default function MetaData () {
  async function handleFile () {
    const res = await window.electron.ipcRenderer.invoke(ServicesDialog.select_file)
    console.log(res)
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
