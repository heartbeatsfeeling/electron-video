import Player from '@renderer/components/player'
import Timeline from '@renderer/components/timeline'
import useMainStore from '@renderer/store'
import { Fragment } from 'react/jsx-runtime'

export default function Cut () {
  const mainStore = useMainStore()
  return (
    <div className="cut">
      {mainStore.building ? (
        <div className='building'>upload...</div>
      ) : (
        mainStore.videoPath ? (
          <Fragment>
            <div className="top">
                <Player
                  url='//vjs.zencdn.net/v/oceans.mp4'
                />
              </div>
              <div className="bottom">
                <Timeline>
                  <div></div>
                </Timeline>
              </div>
          </Fragment>
        ) : (
          <div className='no-data'>请点击左上角图片上传视频文件</div>
        )
      )}
    </div>
  )
}
