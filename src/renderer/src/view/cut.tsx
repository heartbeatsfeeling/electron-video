import Player from '@renderer/components/player'
import Timeline from '@renderer/components/timeline'

export default function Cut () {
  return (
    <div className="cut">
      <div className="top">
        <Player
          url='//vjs.zencdn.net/v/oceans.mp4'
        />
      </div>
      <div className="bottom">
        <Timeline>
          <div>-</div>
        </Timeline>
      </div>
    </div>
  )
}
