import { ipcMain } from 'electron'
import { selectFile } from '../services'

ipcMain.handle('dialog:select-file', async () => {
  return selectFile()
})
