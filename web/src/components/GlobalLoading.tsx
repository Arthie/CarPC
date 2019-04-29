import React from "react"
import styled from "styled-components"
import { CircularProgress } from "@rmwc/circular-progress"

const GlobalLoadingWrapper = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  && div {
    color: #ff9d00;
  }
`

const GlobalLoading = () => (
  <GlobalLoadingWrapper>
    <CircularProgress size={100} />
  </GlobalLoadingWrapper>
)

export default GlobalLoading
