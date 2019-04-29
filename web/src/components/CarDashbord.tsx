import React, { FC } from "react"

import { GaugeContainer } from "./styles/GaugeContainer"
import Gauge from "./Gauge"

const CarDashbord: FC = () => {
  return (
    <GaugeContainer>
      <Gauge text="km/h" />
    </GaugeContainer>
  )
}

export default CarDashbord
