import { app, dialog } from 'electron'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import { MAX_FILE_SIZE } from '../../config/config'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import ffprobePath from 'ffprobe-static'
import { join } from 'node:path'

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
  console.time('信息获取')
  const metadata = await new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err)
      } else {
        resolve(metadata)
      }
    })
  })
  console.timeEnd('信息获取')
  console.time('生成图')
  const files = await Promise.all(
    new Array(12).fill(0).map((_, index) => (new Promise((_resolve, reject) => {
      const filename = `thumbnail-at-${(index + 1).toString().padStart(4, '0')}.jpg`
      const timemarks = [`${(100 / 12) * index}%`]
      ffmpeg(filePath)
        .on('end', () => {
          _resolve(join(appDir, filename))
        })
        .on('error', () => {
          reject(new Error())
        })
        .screenshots({
          count: 1,
          timemarks,
          filename,
          folder: appDir,
          size: '320x?',
          quality: 32
        })
    })))
  )
  console.timeEnd('生成图')
  console.time('合图')
  const readVideo = await new Promise((_resolve, reject) => {
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
        console.error('Error creating montage', err.message)
        reject(new Error())
      })
      .run()
  })
  console.timeEnd('合图')
  return {
    filePath,
    metadata,
    ...(readVideo || {})
  }
}
