import { app, dialog } from 'electron'
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { MAX_FILE_SIZE } from '../../config/config'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import ffprobePath from 'ffprobe-static'
import { join, resolve } from 'node:path'

ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath.path)
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
  console.time('选文件')
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
  const tempDir = 'video_tempDir'
  const appDir = join(app.getPath('userData'), tempDir)
  const bgImage = join(appDir, 'gb.png')
  if (!existsSync(appDir)) {
    mkdirSync(appDir)
  }
  const readVideo = await new Promise((_resolve, reject) => {
    ffmpeg(filePath)
      .on('end', () => {
        const files = readdirSync(appDir).filter(file => file.includes('thumbnail-at')).sort().map(file => resolve(join(appDir, file)))
        const command = ffmpeg()
        files.forEach(file => {
          command.input(file)
        })
        command.complexFilter(
          files.map((_, index) => `[${index}:v]`).join('') + `hstack=inputs=${files.length}`
        )
          .output(bgImage)
          .on('end', () => {
            console.log('Montage created successfully!')
            _resolve({
              files,
              bgImage
            })
          })
          .on('error', (err) => {
            console.error('Error creating montage:xxx', err.message)
            reject(new Error())
          })
          .run()
      })
      .on('error', (err) => {
        reject(new Error())
        console.error('Error taking screenshots:', err)
      })
      .screenshots({
        count: 12,
        filename: 'thumbnail-at-%000i.png',
        folder: appDir,
        size: '320x240'
      })
  })
  console.timeEnd('选文件')
  console.log(readVideo)
  return filePath
}
