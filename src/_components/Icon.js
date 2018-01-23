import React from "react"
import { iconConstants } from "../_constants"

const Icon = props => {
  const { width = 32, height = 32, color = "#FFFFFF" } = props
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

export { Icon }
