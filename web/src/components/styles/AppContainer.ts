import styled from "styled-components"
export const AppContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto repeat(4, 1fr);
  grid-template-rows: auto auto repeat(4, 1fr);
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
