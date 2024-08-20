import { Slider, SliderThumb } from '@mui/material'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface Props {
  children: ReactNode
}
export default function Timeline (props: Props) {
  const timelineRef = useRef<null | HTMLDivElement>(null)
  const [step, setStep] = useState(5)
  const [timeline, setTimeline] = useState<number[]>([])
  const [time, setTime] = useState([0, 100])
  useEffect(() => {
    const a = calculateStep(46, step)
    setStep(a.step)
    setTimeline(new Array(a.len).fill(a.step))
  }, [])
  function calculateStep (count: number, step: number) {
    let r = count / step
    while (r > 20) {
      step = step * 2
      r = calculateStep(count, step).len
    }
    return {
      len: Math.max(Math.ceil(r), 1),
      step
    }
  }
  function handleTimeChange (_, d: number | number[], index: number) {
    console.log(index)
    setTime(d as number[])
  }
  function AirbnbThumbComponent (props) {
    const { children, ...other } = props
    return (
      <SliderThumb {...other}>
        {children}
        a
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
      </SliderThumb>
    )
  }
  return (
    <div className="time-line" ref={timelineRef}>
      <div className="time-line-rule">
        {timeline.map((_, index) => (
          <div className="time-line-item" key={index}>
            <span className="text">{index * step}</span>
          </div>
        ))}
      </div>
      <div className="text-preview-line">{props.children}</div>
      <div className='image-preview-line'>
        <Slider
          value={time}
          onChange={handleTimeChange}
          slots={{
            thumb: AirbnbThumbComponent
          }}
        >eee</Slider>
      </div>
    </div>
  )
}
