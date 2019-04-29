import React, { FC, ChangeEvent } from "react"
import {
  TimeText,
  TimeSlider,
  TimeControls
} from "./styles/MusicPlayerTimeControls"
import {
  HTMLMediaControls,
  HTMLMediaState
} from "react-use/lib/util/createHTMLMediaHook"
import { timeConverter } from "../utils"

export interface MusicPlayerTimeControls {
  audioControls: HTMLMediaControls
  audioState: HTMLMediaState
}

const MusicPlayerTimeControls: FC<MusicPlayerTimeControls> = props => {
  const onSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    props.audioControls.seek(Number.parseFloat(value))
    if (!props.audioState.isPlaying) {
      props.audioControls.play()
    }
  }

  const currentTime = props.audioState.time
  const convertedCurrentTime = timeConverter(currentTime)
  const totalTime = props.audioState.duration
  const convertedTotalTime = timeConverter(totalTime)

  return (
    <TimeControls>
      <TimeText>{convertedCurrentTime}</TimeText>
      <TimeSlider
        id="music-time-slider"
        className="range"
        onChange={onSeekChange}
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

export default MusicPlayerTimeControls
