import { ReactNode, useEffect, useRef, useState } from 'react'

interface Props {
  children: ReactNode
  duration: number
}
export default function Timeline (props: Props) {
  const timelineRef = useRef<null | HTMLDivElement>(null)
  const [step, setStep] = useState(5)
  const [timeline, setTimeline] = useState<number[]>([])
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
  return (
    <div className="time-line" ref={timelineRef}>
      <div className="time-line-rule">
        {timeline.map((_, index) => (
          <div className="time-line-item" key={index}>
            <span className="text">{index * step}</span>
          </div>
        ))}
      </div>
      {props.children}
    </div>
  )
}
