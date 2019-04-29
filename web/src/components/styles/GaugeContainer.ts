import styled from "styled-components"

export const GaugeContainer = styled.div`
  height: 15rem;
  width: 15rem;
  grid-area: carGauge;
  margin: 0.5rem;
  background-color: #1f364d;
  border-radius: 0.5rem;
  padding: 1.5rem;

  circle {
    transition: all 0.1s;
  }
`
