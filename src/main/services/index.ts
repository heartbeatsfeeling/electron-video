import { dialog } from 'electron'
import { statSync } from 'node:fs'
import { MAX_FILE_SIZE } from '../../config/config'
/**
 * 选择文体
 * @returns Promise<Electron.OpenDialogReturnValue>
 */
export async function selectFile () {
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
  const filePath = filePaths[0]
  const fileSizeInBytes = statSync(filePath).size
  const maxSizeInBytes = MAX_FILE_SIZE
  if (fileSizeInBytes > maxSizeInBytes) {
    dialog.showErrorBox('错误', '文件过大或类型不支持')
    return null
  }
  return filePath
}
