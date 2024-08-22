import { dialog, ipcMain } from 'electron'
import { selectFile } from '../services'
import { FileServicesDialog, FileServices } from '../../config/enum'

ipcMain.handle(FileServicesDialog.select_file, async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: '选择一个视频文件',
    filters: [
      { name: 'Videos', extensions: ['mp4', 'mkv', 'avi', 'mov'] }
    ],
    properties: ['openFile']
  })
  console.time('选文件')
  if (canceled) {
    return null
  }
  return filePaths[0]
})

ipcMain.handle(FileServices.decodeFile, (_, data: string) => {
  return selectFile(data)
})
