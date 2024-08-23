import { Slider, SliderThumb } from '@mui/material'
import Player from '@renderer/components/player'
import Timeline from '@renderer/components/timeline'
import useMainStore from '@renderer/store'
import { useEffect, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'

export default function Cut () {
  const mainStore = useMainStore()
  const [time, setTime] = useState([0, 100])
  useEffect(() => {
    setTime([0, 100])
  }, [mainStore.videoPath])
  function handleTimeChange (_, d: number | number[]) {
    setTime(d as number[])
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
  return (
    <div className="cut">
      {mainStore.building ? (
        <div className='building'>upload...</div>
      ) : (
        mainStore.videoPath ? (
          <Fragment>
            <div className="top">
                <Player
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
              </div>
          </Fragment>
        ) : (
          <div className='no-data'>请点击左上角图标上传视频文件</div>
        )
      )}
    </div>
  )
}
