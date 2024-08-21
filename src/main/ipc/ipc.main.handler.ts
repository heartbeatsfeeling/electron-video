import { ipcMain } from 'electron'
import { selectFile } from '../services'
import { ServicesDialog } from '../../config/enum'

ipcMain.handle(ServicesDialog.select_file, async () => {
  return selectFile()
})
