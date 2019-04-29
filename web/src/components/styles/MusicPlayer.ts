import styled from "styled-components"

export const MusicPlayerSideContainer = styled.div`
  grid-area: musicSide;
  display: grid;

  margin: 0.5rem;
  background-color: #1f364d;
  border-radius: 0.5rem;
`

export const MusicPlayerHeadContainer = styled.div`
  grid-area: musicHeader;
  margin: 0.5rem;
  background-color: #1f364d;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SVGButton = styled.div`
  padding: 0.5rem;
`

export const ExtraControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
