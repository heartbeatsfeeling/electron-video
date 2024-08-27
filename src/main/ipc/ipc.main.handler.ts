import { app, dialog, ipcMain } from 'electron'
import { buildVideo, cutVideo } from '../services/file.services'
import { FileServicesDialog, FileServices } from '../../config/enum'
import { basename, extname, join } from 'node:path'
import { TEMP_DIR } from '../../config/config'
import { CutParams } from '../../../type/services'

ipcMain.handle(FileServicesDialog.select_file, async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: '选择一个视频文件',
    filters: [
      { name: 'Videos', extensions: ['mp4', 'mkv', 'avi', 'mov'] }
    ],
    properties: ['openFile']
  })
  if (canceled) {
    return null
  }
  return filePaths[0]
})
ipcMain.handle(FileServicesDialog.save_file, async (_, filePath: string) => {
  const name = basename(filePath).split('.')[0]
  const ext = extname(filePath).split('?')[0]
  const appDir = join(app.getPath('userData'), TEMP_DIR)
  const res = await dialog.showSaveDialog(null as any, {
    title: '保存文件',
    defaultPath: join(appDir, `${name}_cut${ext}`),
    buttonLabel: '保存',
    filters: [
      { name: 'Text Files', extensions: ['mp4'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })
  return res
})

ipcMain.handle(FileServices.decode_file, (_, data: string) => {
  return buildVideo(data)
})
ipcMain.handle(FileServices.cut_file, (_, data: CutParams) => {
  return cutVideo(data)
})
