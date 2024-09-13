import { intervalToDuration } from 'date-fns'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface Props {
  children: ReactNode
  duration: number
}

export default function Timeline (props: Props) {
  const timelineRef = useRef<null | HTMLDivElement>(null)
  const [step, setStep] = useState(5)
  const [timeline, setTimeline] = useState<number[]>([])
  const [overRight, setOverRight] = useState(0) // 多余宽度
  useEffect(() => {
    const oTime = step * timeline.length - props.duration // 多出来的秒
    setOverRight(oTime / props.duration)
  }, [step, timeline, props.duration])
  useEffect(() => {
    const a = calculateStep(props.duration, step)
    setStep(a.step)
    setTimeline(new Array(Math.max(Math.ceil(a.len), 1)).fill(a.step))
  }, [props.duration])
  function calculateStep (count: number, step: number) {
    let s = step
    while (count / s > 20) {
      s = s * 2
    }
    return {
      len: count / s,
      step: s
    }
  }
  function formatTime (time: number) {
    const duration = intervalToDuration({ start: 0, end: time * 1000 })
    const formattedTime = [
      String(duration.minutes || 0).padStart(2, '0'),
      String(duration.seconds || 0).padStart(2, '0')
    ]
    if (duration.hours) {
      formattedTime.unshift(
        String(duration.hours || 0).padStart(2, '0')
      )
    }
    return formattedTime.join(':')
  }
  return (
    <div className="time-line">
      <div className="time-line-inner"
        ref={timelineRef}
      >
        <div className="time-line-wrapper">
          <div className="time-text-rule" style={{ marginRight: `-${overRight * 100}%` }}>
            {timeline.map((_, index) => (
              <div className="time-text-item" key={index}>
                <span className="text">{formatTime(index * step)}</span>
              </div>
            ))}
          </div>
          <div className="time-line-rule-wrapper">
            <div className="time-line-rule" style={{ marginRight: `-${overRight * 100}%` }}>
              {timeline.map((_, index) => (
                <div className="time-line-item" key={index}></div>
              ))}
            </div>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}
