import { app } from 'electron'
import express from 'express'
import { join } from 'node:path'
import { HOST, PORT, TEMP_DIR } from '../../config/config'
export default function createHttpService () {
  const server = express()
  const userDataPath = app.getPath('userData')
  server.use('/files', express.static(join(userDataPath, TEMP_DIR)))
  server.get('/test', (_, res) => {
    res.send('Hello from Express!')
  })
  server.listen(PORT, () => {
    console.log(`Server is running on ${HOST}:${PORT}`)
  })
}
