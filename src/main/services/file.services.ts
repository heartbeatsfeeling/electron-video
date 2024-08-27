import { app, dialog } from 'electron'
import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { HOST, MAX_FILE_SIZE, PORT, TEMP_DIR } from '../../config/config'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import ffprobePath from 'ffprobe-static'
import { basename, join } from 'node:path'
import { CutParams } from '../../../type/services'

ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath.path)
/**
 * 解析视频文件
 * @returns Promise<Electron.OpenDialogReturnValue>
 */
export async function buildVideo (filePath: string) {
  const fileSizeInBytes = statSync(filePath).size
  const maxSizeInBytes = MAX_FILE_SIZE
  if (fileSizeInBytes > maxSizeInBytes) {
    dialog.showErrorBox('错误', '文件过大或类型不支持')
    return null
  }
  const appDir = join(app.getPath('userData'), TEMP_DIR)
  const bgImage = join(appDir, 'gb.png')
  if (!existsSync(appDir)) {
    mkdirSync(appDir)
  }
  console.time('信息获取')
  const metadata: any = await new Promise((resolve, reject) => {
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
  const files = await Promise.all<Promise<string>[]>(
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
          size: '130x?',
          quality: 32
        })
    })))
  )
  console.timeEnd('生成图')
  console.time('合图')
  await new Promise<{ bgImage: string }>((_resolve, reject) => {
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
  copyFileSync(filePath, join(appDir, basename(filePath)))
  return {
    duration: metadata.format.duration,
    size: metadata.format.size,
    video: `${HOST}:${PORT}/files/${basename(filePath)}?t=${Date.now()}`,
    image: `${HOST}:${PORT}/files/${basename(files[1])}?t=${Date.now()}`,
    bgImage: `${HOST}:${PORT}/files/${basename(bgImage)}?t=${Date.now()}`
  }
}
export async function cutVideo (data: CutParams) {
  const res = {
    status: true,
    msg: ''
  }
  console.log(data)
  if (existsSync(data.videoPath)) {
    const r = await new Promise<{ status: boolean, msg: string }>((resolve, reject) => {
      ffmpeg(data.videoPath)
        .setStartTime(data.startTime)
        .setDuration(data.duration)
        .output(data.videoPath)
        .on('end', function () {
          resolve({ status: true, msg: '' })
          console.log('视频截取完成')
        })
        .on('error', function (err) {
          reject({ status: false, msg: err.message })
          console.error('视频截取失败: ' + err.message)
        })
        .run()
      res.status = r.status
      res.msg = r.msg
    })
  } else {
    res.status = false
    res.msg = '文件不存在'
  }
  return res
}
