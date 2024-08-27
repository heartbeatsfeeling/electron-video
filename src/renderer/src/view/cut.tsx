import { FileServices, FileServicesDialog } from '@/config/enum'
import { Button, duration, Slider, SliderThumb } from '@mui/material'
import VPlay, { VPlayer } from '@renderer/components/player'
import Timeline from '@renderer/components/timeline'
import useMainStore from '@renderer/store'
import { useEffect, useRef, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import CircularProgress from '@mui/material/CircularProgress'
import { format } from 'date-fns'

export default function Cut () {
  const mainStore = useMainStore()
  const playerRef = useRef<null | VPlayer>(null)
  const [time, setTime] = useState([0, 100])
  const [enableSave, setEnableSave] = useState(false)
  const [saveing, setsaveIng] = useState(false)
  useEffect(() => {
    setTime([0, 100])
  }, [mainStore.videoPath])
  useEffect(() => {
    setEnableSave(
      time.join('-') === '0-100'
    )
  }, [time])
  function handleTimeChange (_, d: number | number[]) {
    setTime(d as number[])
    playerRef.current?.player.currentTime(d[0] * mainStore.duration * 0.01)
  }
  function Track (props) {
    const leftWidth = props.style.left
    const rihgtWidth = `calc(100% - ${props.style.width} - ${leftWidth})`
    return (
      <div className={props.className}>
        <div className="track-left" style={{ width: leftWidth }}></div>
        <div className="track-border" style={{ left: leftWidth, right: rihgtWidth }}></div>
        <div className="bg-image">
          <img src={mainStore.bgImage} alt="" />
        </div>
        <div className="track-right" style={{ width: rihgtWidth }}></div>
      </div>
    )
  }
  function Thumb (props) {
    const { children, ...other } = props
    return (
      <SliderThumb { ...other }>
        {children}
        <span></span>
      </SliderThumb>
    )
  }
  async function handleSave () {
    const res = await window.electron.ipcRenderer.invoke(FileServicesDialog.save_file, mainStore.videoPath)
    if (res?.filePath) {
      setsaveIng(true)
      const startTime = mainStore.duration * time[0] * 0.01
      const endTime = mainStore.duration * time[1] * 0.01
      const duration = endTime - startTime
      console.log(startTime, format(startTime * 1000, 'HH:mm:ss'))
      // const s = await window.electron.ipcRenderer.invoke(FileServices.cut_file, {
      //   outPath: res.filePath,
      //   videoPath: mainStore.videoPath,
      //   startTime,
      //   duration: mainStore.duration - startTime
      // })
      // console.log(s)
      setsaveIng(false)
    }
  }
  return (
    <div className="cut">
      {mainStore.building ? (
        <div className='building'>upload...</div>
      ) : (
        mainStore.videoPath ? (
          <Fragment>
            <div className="top">
              <VPlay
                ref={playerRef}
                url={mainStore.videoPath}
              />
            </div>
            <div className="bottom">
              <Timeline
                duration={mainStore.duration}
              >
                <div className='image-preview-line'>
                  <Slider
                    value={time}
                    onChange={handleTimeChange}
                    slots={{
                      track: Track,
                      thumb: Thumb
                    }}
                  />
                </div>
              </Timeline>
              <div className='action'>
                <Button
                  variant="contained"
                  size="small"
                  disabled={enableSave || saveing}
                  onClick={handleSave}
                >
                  {saveing ? (
                    <CircularProgress size={'20'}></CircularProgress>
                  ) : (
                    '保存'
                  )}
                </Button>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className='no-data'>请点击左上角图标上传视频文件</div>
        )
      )}
    </div>
  )
}
