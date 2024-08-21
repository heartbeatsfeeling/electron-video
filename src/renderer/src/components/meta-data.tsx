import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { Button } from '@mui/material'
import { ServicesDialog } from '@/config/enum'

export default function MetaData () {
  async function handleFile () {
    const res = await window.electron.ipcRenderer.invoke(ServicesDialog.select_file)
    console.log(res)
  }
  return (
    <div className='text-center'>
      <Button
        fullWidth
        variant="contained"
        startIcon={<DriveFolderUploadOutlinedIcon />}
        onClick={handleFile}
      >
        选择视频文件
      </Button>
    </div>
  )
}
