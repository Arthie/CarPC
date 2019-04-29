import React, { FC, useContext } from "react"
import {
  Metadata,
  MetadataImg,
  MetadataText,
  MetadataTitle,
  MetadataSubtitle
} from "./styles/MusicPlayerMetadata"
import { AppContextType, AppContext } from "../App"
import { appConstants, assetConstants } from "../constants"

const MusicPlayerMetadata: FC = props => {
  const { musicPlayerState } = useContext<AppContextType>(AppContext)

  const songPicture =
    musicPlayerState.song && musicPlayerState.song.metadata.picture
      ? `${appConstants.SERVER}/static${musicPlayerState.song.metadata.picture}`
      : assetConstants.MUSICICON

  const songTitle = musicPlayerState.song
    ? musicPlayerState.song.metadata.title
    : ""

  const songSubtitle = musicPlayerState.song
    ? musicPlayerState.song.metadata.artist
    : ""

  return (
    <Metadata>
      {musicPlayerState.song && (
        <MetadataImg src={songPicture} alt="song art" />
      )}
      <MetadataText>
        <MetadataTitle>{songTitle}</MetadataTitle>
        <MetadataSubtitle>{songSubtitle}</MetadataSubtitle>
      </MetadataText>
    </Metadata>
  )
}

export default MusicPlayerMetadata
