import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.min.css'

interface Props {
  url: string
  onReady: (player: Player) => void
}
export default forwardRef(function Vplay (props: Props, ref) {
  const videoRef = useRef<null | HTMLDivElement>(null)
  const playerRef = useRef<null | Player>(null)
  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js')
      videoElement.classList.add('vjs-big-play-centered')
      videoRef.current!.appendChild(videoElement)
      const extName = props.url.split('?')[0].split('.').pop()
      playerRef.current = videojs(videoElement, {
        controls: true,
        sources: [{
          src: props.url,
          type: `video/${extName}`
        }]
      }, () => {
        props.onReady?.(playerRef.current!)
      })
    } else {
      const player = playerRef.current
      player.autoplay(false)
      player.src(props.url)
    }
  }, [])
  useEffect(() => {
    const player = playerRef.current
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])
  return (
    <div className="video" ref={videoRef}></div>
  )
})
