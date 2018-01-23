import React, { PureComponent } from "react"
import styled from "styled-components"
import { Icon } from "../_components"

const SongControls = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`

const TextControls = styled.span`
  color: #f5f5f5;
`

const SVGButton = styled.div`
  padding: 0.5rem;
`

const VolumeControls = styled.div`
  display: flex;
  flex-direction: column;
  width: 35px;
  height: 0;
  align-items: center;
`

const VolumeSlider = styled.input`
  transform: rotate(-90deg);
  width: 120px !important;
  padding-left: 60px;
`

class MusicPlayerVolumeControls extends PureComponent {
  render() {
    const { volumeOnClick, volumeIcon, volume, volumeOnChange } = this.props
    return (
      <SongControls>
        <SVGButton onClick={volumeOnClick}>
          <Icon {...volumeIcon} />
        </SVGButton>

        <VolumeControls>
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={volumeOnChange}
          />
          <TextControls>{Math.floor(volume * 100) + "%"}</TextControls>
        </VolumeControls>
      </SongControls>
    )
  }
}

export { MusicPlayerVolumeControls }
