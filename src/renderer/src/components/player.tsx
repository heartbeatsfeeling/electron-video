import { useEffect, useRef } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.min.css'

interface Props {
  url: string
}
export default function VPlayer ({ url } : Props) {
  const videoRef = useRef<null | HTMLVideoElement>(null)
  const playerRef = useRef<null | Player>(null)
  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        sources: [{
          src: url,
          type: 'video/mp4'
        }]
      })
    }
    return () => {
      if (playerRef.current) {
        playerRef.current = null
      }
    }
  }, [])
  return (
    <div className="video video-js">
      <video ref={videoRef}/>
    </div>
  )
}
