import React, { FC, useState, useContext } from "react"
import useAudio from "react-use/lib/useAudio"

import { appConstants } from "../constants"

import Icon from "./Icon"

import {
  ExtraControls,
  MusicPlayerSideContainer,
  SVGButton,
  MusicPlayerHeadContainer
} from "./styles/MusicPlayer"
import MusicPlayerVolumeControls from "./MusicPlayerVolumeControls"
import MusicPlayerSongControls from "./MusicPlayerSongControls"
import MusicPlayerMetadata from "./MusicPlayerMetadata"
import MusicPlayerTimeControls from "./MusicPlayerTimeControls"
import { AppContextType, AppContext } from "../App"

const MusicPlayer: FC = props => {
  const context = useContext<AppContextType>(AppContext)
  const [audio, audioState, audioControls, audioRef] = useAudio({
    src: context.musicPlayerState.song
      ? `${appConstants.SERVER}/static${context.musicPlayerState.song.path}`
      : "",
    autoPlay: true
  })

  const [loop, setLoop] = useState(false)

  const loopAudio = () => setLoop(prevState => !prevState)

  ////////////////
  //Audio Events//
  ////////////////

  //Fires when the current song ended
  const onEnded = () =>
    loop
      ? audioControls.play()
      : context.dispatchMusicPlayer({ type: "NEXT_SONG", data: {} })

  if (audioRef.current) audioRef.current.onended = onEnded

  return (
    <>
      {audio}
      <MusicPlayerSideContainer>
        <ExtraControls>
          <SVGButton
            onClick={() =>
              context.dispatchMusicPlayer({ type: "SHUFFLE_LIST", data: {} })
            }
          >
            <Icon
              title="SHUFFLE"
              width="3rem"
              height="3rem"
              color={context.musicPlayerState.shuffle ? "#FF9D00" : "#F5F5F5"}
            />
          </SVGButton>
          <SVGButton onClick={loopAudio}>
            <Icon
              title="LOOP"
              width="3.5rem"
              height="3.5rem"
              color={loop ? "#FF9D00" : "#F5F5F5"}
            />
          </SVGButton>
        </ExtraControls>
        <MusicPlayerVolumeControls
          audioControls={audioControls}
          audioState={audioState}
        />
        <MusicPlayerSongControls
          audioControls={audioControls}
          audioState={audioState}
        />
      </MusicPlayerSideContainer>
      <MusicPlayerHeadContainer>
        <MusicPlayerMetadata />
        <MusicPlayerTimeControls
          audioControls={audioControls}
          audioState={audioState}
        />
      </MusicPlayerHeadContainer>
    </>
  )
}

export default MusicPlayer
