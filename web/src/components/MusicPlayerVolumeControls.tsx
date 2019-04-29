import React, { FC } from "react"
import Icon from "./Icon"
import {
  SongControls,
  SVGButton,
  VolumeControls,
  VolumeSlider,
  TextControls
} from "./styles/MusicPlayerVolumeControls"
import {
  HTMLMediaState,
  HTMLMediaControls
} from "react-use/lib/util/createHTMLMediaHook"

export interface MusicPlayerVolumeControlsProps {
  audioControls: HTMLMediaControls
  audioState: HTMLMediaState
}
const MusicPlayerVolumeControls: FC<MusicPlayerVolumeControlsProps> = props => {
  const { volume, muted } = props.audioState
  const volumeIcon = {
    title: muted
      ? "SPEAKERMUTED"
      : volume === 1
      ? "SPEAKERFULL"
      : volume === 0
      ? "SPEAKERMUTED"
      : "SPEAKERHALF",
    width: "2.8rem",
    height: "2.8rem",
    color: "#FF9D00"
  }

  return (
    <SongControls>
      <SVGButton
        onClick={
          muted
            ? () => props.audioControls.unmute()
            : () => props.audioControls.mute()
        }
      >
        <Icon {...volumeIcon} />
      </SVGButton>

      <VolumeControls>
        <VolumeSlider
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={e =>
            props.audioControls.volume(Number.parseFloat(e.target.value))
          }
        />
        <TextControls>{Math.floor(volume * 100) + "%"}</TextControls>
      </VolumeControls>
    </SongControls>
  )
}

export default MusicPlayerVolumeControls
