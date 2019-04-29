import React, { FC, useContext } from "react"
import Icon from "./Icon"
import { SongControls, SVGButton } from "./styles/MusicPlayerSongControls"
import { AppContextType, AppContext } from "../App"
import {
  HTMLMediaState,
  HTMLMediaControls
} from "react-use/lib/util/createHTMLMediaHook"

export interface MusicPlayerSongControlsProps {
  audioControls: HTMLMediaControls
  audioState: HTMLMediaState
}
const MusicPlayerSongControls: FC<MusicPlayerSongControlsProps> = props => {
  const context = useContext<AppContextType>(AppContext)
  const nextSong = () => {
    context.dispatchMusicPlayer({ type: "NEXT_SONG", data: {} })
  }

  const prevSong = () => {
    context.dispatchMusicPlayer({ type: "PREV_SONG", data: {} })
  }

  const prevIcon = {
    title: "PREV",
    width: "2.4rem",
    height: "2.4rem",
    color: "#FF9D00"
  }

  const playIcon = {
    title: props.audioState.isPlaying ? "PAUSE" : "PLAY",
    width: "1.8rem",
    height: "2.4rem",
    color: "#FF9D00"
  }

  const nextIcon = {
    title: "NEXT",
    width: "2.4rem",
    height: "2.4rem",
    color: "#FF9D00"
  }
  return (
    <SongControls>
      <SVGButton onClick={prevSong}>
        <Icon {...prevIcon} />
      </SVGButton>

      <SVGButton
        onClick={
          props.audioState.isPlaying
            ? () => props.audioControls.pause()
            : () => props.audioControls.play()
        }
      >
        <Icon {...playIcon} />
      </SVGButton>

      <SVGButton onClick={nextSong}>
        <Icon {...nextIcon} />
      </SVGButton>
    </SongControls>
  )
}

export default MusicPlayerSongControls
