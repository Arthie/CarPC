import React, { PureComponent } from "react"
import styled from "styled-components"

const TimeControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
  width: 95%;
  margin: 0 5px 5px 5px;
`

const TimeText = styled.span`
  height: 20px;
`

const TimeSlider = styled.input`
  height: 20px;
`

class MusicPlayerTimeControls extends PureComponent {
  render() {
    const {
      currentTime,
      totalTime,
      convertedCurrentTime,
      convertedTotalTime,
      onSeekMouseDown,
      onSeekChange,
      onSeekMouseUp
    } = this.props
    return (
      <TimeControls>
        <TimeText>{convertedCurrentTime}</TimeText>
        <TimeSlider
          id="music-time-slider"
          className="range"
          onMouseDown={onSeekMouseDown}
          onChange={onSeekChange}
          onMouseUp={onSeekMouseUp}
          type="range"
          min="0"
          max={totalTime}
          step="any"
          value={currentTime}
        />
        <TimeText>{convertedTotalTime}</TimeText>
      </TimeControls>
    )
  }
}

export { MusicPlayerTimeControls }
