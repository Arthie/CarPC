import React, { Component } from "react"
import styled from "styled-components"

import { Gauge } from "./"

import { subscribeToSPEED, subscribeToRPM } from "../_services"

const GaugeContainer = styled.div`
  height: 150px;
  width: 150px;
  grid-area: carGauge;
  margin: 5px;
  background-color: #1f364d;
  border-radius: 5px;
  padding: 15px;
`

//Work in progess :)
class CarDashbord extends Component {
  state = {
    speedGaugeValue: 0,
    rpmGaugeValue:0
  }

  componentWillMount() {
    subscribeToSPEED((err, ODB) =>
      this.setState({
        speedGaugeValue: ODB.SPEED,
      })
    )
    subscribeToRPM((err, ODB) =>
      this.setState({
        rpmGaugeValue: ODB.RPM
      })
    )
  }

  render() {
    return (
      <GaugeContainer>
        <Gauge 
        speedGaugeValue={this.state.speedGaugeValue}
        rpmGaugeValue={this.state.rpmGaugeValue}
        text="km/h"
        />
      </GaugeContainer>
    )
  }
}

export { CarDashbord }
