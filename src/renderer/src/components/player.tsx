import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.min.css'

interface Props {
  url: string
}

export default forwardRef(function Vplay (props: Props, ref) {
  const videoRef = useRef<null | HTMLVideoElement>(null)
  const playerRef = useRef<null | Player>(null)
  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        sources: [{
          src: props.url,
          type: 'video/mp4'
        }]
      })
    }
  }, [])
  useImperativeHandle(ref, () => {
    return {
      player: playerRef.current,
      vide: playerRef.current
    }
  }, [])
  return (
    <div className="video video-js">
      <video ref={videoRef}/>
    </div>
  )
})
