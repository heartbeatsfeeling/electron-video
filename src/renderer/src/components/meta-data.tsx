import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { Button } from '@mui/material'

export default function MetaData () {
  return (
  <div className='text-center'>
    <Button fullWidth variant="contained" startIcon={<DriveFolderUploadOutlinedIcon />}>
      选择视频文件
    </Button>
  </div>
  )
}
