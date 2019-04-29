import React, { FC, useState, useEffect } from "react"

export interface GaugeCircle {
  startAngle: number
  cutoutPercentage: number
  r: number
  maxValue: number
  fillBackground: string
  strokeBackground: string
  fill: string
  stroke: string
  strokeWidth: string
  strokeWidthBackground: string
  strokeLinecapBackground?: "butt" | "round" | "square" | "inherit"
  strokeLinecap?: "butt" | "round" | "square" | "inherit"
  value: number
}

const GaugeCircle: FC<GaugeCircle> = props => {
  const [circumference, setCircumference] = useState(0)
  const [rotateAngle, setRotateAngle] = useState(0)

  useEffect(() => {
    //get radius + calculate circumference
    const circumference = 2 * Math.PI * props.r
    const rotateAngle = (360 * props.cutoutPercentage) / 2 + props.startAngle

    setCircumference(() => circumference)
    setRotateAngle(() => rotateAngle)
  }, [props.r, props.cutoutPercentage, props.startAngle])

  const setGaugeValue = (value: number) => {
    const per = value / props.maxValue > 1 ? 1 : value / props.maxValue
    return circumference * (1 - per * (1 - props.cutoutPercentage))
  }

  return (
    <g transform={`rotate(${rotateAngle} 50,50)`}>
      <circle
        cx="50"
        cy="50"
        r={props.r}
        fill={props.fillBackground}
        stroke={props.strokeBackground}
        strokeWidth={props.strokeWidthBackground}
        strokeDashoffset={circumference * props.cutoutPercentage}
        strokeDasharray={circumference}
        strokeLinejoin="round"
        strokeLinecap={props.strokeLinecapBackground}
        paintOrder="markers stroke fill"
      />
      <circle
        cx="50"
        cy="50"
        r={props.r}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        strokeDashoffset={setGaugeValue(props.value)}
        strokeDasharray={circumference}
        strokeLinejoin="round"
        strokeLinecap={props.strokeLinecap}
        paintOrder="markers stroke fill"
      />
    </g>
  )
}

export default GaugeCircle
