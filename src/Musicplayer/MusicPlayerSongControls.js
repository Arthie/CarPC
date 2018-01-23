import React, { PureComponent } from "react"
import styled from "styled-components"
import { Icon } from "../_components"

const SongControls = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const SVGButton = styled.div`
  padding: 0.5rem;
`

class MusicPlayerSongControls extends PureComponent {
  render() {
    const {
      prevOnClick,
      prevIcon,
      playOnClick,
      playIcon,
      nextOnClick,
      nextIcon
    } = this.props
    return (
      <SongControls>
        <SVGButton onClick={prevOnClick}>
          <Icon {...prevIcon} />
        </SVGButton>

        <SVGButton onClick={playOnClick}>
          <Icon {...playIcon} />
        </SVGButton>

        <SVGButton onClick={nextOnClick}>
          <Icon {...nextIcon} />
        </SVGButton>
      </SongControls>
    )
  }
}

export { MusicPlayerSongControls }
