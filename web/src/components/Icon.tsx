import React, { FC } from "react"
import { iconConstants } from "../constants"

export interface IconProps {
  title: string
  width?: string | number
  height?: string | number
  color?: string
}

const Icon: FC<IconProps> = props => {
  const { width = "3.2rem", height = "3.2rem", color = "#FFFFFF" } = props
  const [viewBox, d] = iconConstants[props.title]
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      aria-labelledby="title"
    >
      <title>{props.title} Icon</title>
      <path fill={color} d={d} />
    </svg>
  )
}

export default Icon
