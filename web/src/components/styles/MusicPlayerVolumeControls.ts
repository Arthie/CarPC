import styled from "styled-components"

export const SongControls = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`

export const TextControls = styled.span`
  font-size: 1.5rem;
  color: #f5f5f5;
`

export const SVGButton = styled.div`
  padding: 0.5rem;
`

export const VolumeControls = styled.div`
  display: flex;
  flex-direction: column;
  width: 3.5rem;
  height: 0;
  align-items: center;
`

export const VolumeSlider = styled.input`
  transform: rotate(-90deg);
  width: 12rem !important;
  padding-left: 6rem;
`
