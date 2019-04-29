import React, { FC, useRef } from "react"
import GaugeCircle from "./GaugeCircle"
import { useCarEventSubscription } from "../graphql/generated/hooks"

export interface GaugeProps {
  text: string
}

const Gauge: FC<GaugeProps> = props => {
  const { data } = useCarEventSubscription()
  const speed = useRef(0)
  const rpm = useRef(0)

  if (data) {
    if (data.carEvent.speed) speed.current = data.carEvent.speed
    if (data.carEvent.rpm) rpm.current = data.carEvent.rpm
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <GaugeCircle
        value={speed.current}
        r={45}
        startAngle={90}
        cutoutPercentage={0.25}
        maxValue={200}
        fill="none"
        stroke="#FF9D00"
        strokeWidth="10"
        fillBackground="none"
        strokeBackground="#274057"
        strokeWidthBackground="9"
      />

      <linearGradient
        id="paint0_linear"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(-84 7.91252e-06 -0.000306463 -2100 84.0002 1092)"
      >
        <stop offset="0" stopColor="#0FF76C" />
        <stop offset="0.474033" stopColor="#0FF76C" />
        <stop offset="0.513812" stopColor="#F3F70F" />
        <stop offset="0.728177" stopColor="#F3F70F" />
        <stop offset="0.779006" stopColor="#FF0000" />
      </linearGradient>

      <GaugeCircle
        value={rpm.current}
        r={35}
        startAngle={90}
        cutoutPercentage={0.5}
        maxValue={6000}
        fill="none"
        stroke="url(#paint0_linear)"
        strokeWidth="7"
        fillBackground="none"
        strokeLinecap="round"
        strokeLinecapBackground="round"
        strokeBackground="#274057"
        strokeWidthBackground="6"
      />

      <text
        dx="50"
        dy="60"
        fill="#F5F5F5"
        strokeWidth=".8"
        fontWeight="bold"
        fontSize="28.2"
        fontFamily="Sans-serif"
        textAnchor="middle"
      >
        <tspan>{speed.current}</tspan>
      </text>
      <text
        dx="50"
        dy="80"
        fill="#E1E1E1"
        strokeWidth=".8"
        fontWeight=""
        fontSize="14.1"
        fontFamily="Sans-serif"
        textAnchor="middle"
      >
        <tspan>{props.text}</tspan>
      </text>
    </svg>
  )
}

export default Gauge
