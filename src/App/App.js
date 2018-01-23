import React, { Component } from "react"
import styled from "styled-components"

import { MusicPlayer } from "../Musicplayer"
import { Explorer } from "../Explorer"
import { CarDashbord } from "../CarDashbord"

const AppContainer = styled.div`
  width: 800px;
  height: 480px;
  display: grid;
  grid-template-columns: 1fr [col-start] repeat(4, 1fr [col-rest]);
  grid-template-rows: 1fr [row-start] repeat(5, 1fr [col-rest]);
  grid-template-areas:
    "carGauge musicHeader musicHeader musicHeader musicHeader"
    "carGauge explorer explorer explorer explorer"
    "musicSide explorer explorer explorer explorer"
    "musicSide explorer explorer explorer explorer"
    "musicSide explorer explorer explorer explorer"
    "musicSide explorer explorer explorer explorer";
  font-family: sans-serif;
  background-color: #0e2437;
  color: #f5f5f5;
`

class App extends Component {
  render() {
    return (
      <AppContainer>
        <MusicPlayer />
        <Explorer />
        <CarDashbord />
      </AppContainer>
    )
  }
}

export { App }
