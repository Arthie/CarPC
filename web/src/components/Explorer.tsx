import React, { FC, useContext } from "react"

import ExplorerItem from "./ExplorerItem"
import { appConstants, assetConstants } from "../constants"
import { timeConverter } from "../utils"
import {
  ExplorerButton,
  ExplorerHeader,
  ExplorerContent
} from "./styles/Explorer"
import { useFolderQuery } from "../graphql/generated/hooks"
import { DirectoryItem, MusicItem } from "../graphql/generated/types"
import { AppContext, AppContextType } from "../App"

export interface ExplorerProps {
  path: string
}

const Explorer: FC<ExplorerProps> = props => {
  const context = useContext<AppContextType>(AppContext)
  const { data, refetch } = useFolderQuery({
    suspend: true,
    variables: {
      path: props.path
    }
  })

  if (!data) return null

  const changeFolder = (path: string) => {
    context.setExplorerPath(path + "/")
  }

  const changeSong = (song: MusicItem) => {
    context.dispatchMusicPlayer({
      type: "SONG_CHANGE",
      data: {
        song,
        songList: data.folder.music
      }
    })
  }

  return (
    <>
      <ExplorerHeader>
        <ExplorerButton
          onClick={() => refetch({ path: appConstants.DEFAULTFOLDERPATH })}
        >
          <span>HOME</span>
        </ExplorerButton>
      </ExplorerHeader>
      <ExplorerContent>
        {data.folder.directories.map((item, index) => {
          return (
            <ExplorerItemDirectory
              key={index}
              changeFolder={changeFolder}
              item={item}
            />
          )
        })}
        {data.folder.music.map((item, index) => {
          return (
            <ExplorerItemMusic
              musicPlayerpath={
                context && context.musicPlayerState.song
                  ? context.musicPlayerState.song.path
                  : ""
              }
              key={index}
              index={index}
              changeSong={changeSong}
              item={item}
            />
          )
        })}
      </ExplorerContent>
    </>
  )
}

interface ExplorerItemDirectoryProps {
  changeFolder: (path: string) => void
  item: MusicItem | DirectoryItem
}

const ExplorerItemDirectory: FC<ExplorerItemDirectoryProps> = props => {
  const title = props.item.path.replace(new RegExp("/", "g"), "")

  return (
    <ExplorerItem
      onClick={() => props.changeFolder(props.item.path)}
      iconSrc={assetConstants.MUSICFOLDERICON}
      title={title}
      subtitle="folder"
    />
  )
}

interface ExplorerItemMusicProps {
  index: number
  changeSong: (song: MusicItem) => void
  item: MusicItem
  musicPlayerpath: string
}

const ExplorerItemMusic: FC<ExplorerItemMusicProps> = props => {
  const title = props.item.metadata.title
    ? props.item.metadata.title
    : props.item.path
  const iconSrc = props.item.metadata.picture
    ? `${appConstants.SERVER}/static${props.item.metadata.picture}`
    : assetConstants.MUSICICON

  const time = timeConverter(props.item.metadata.duration)

  const subtitle = props.item.metadata
    ? `${props.item.metadata.artist} - ${time}`
    : time

  const selected = props.item.path === props.musicPlayerpath

  return (
    <ExplorerItem
      index={props.index}
      onClick={() => props.changeSong(props.item)}
      iconSrc={iconSrc}
      title={title}
      subtitle={subtitle}
      selected={selected}
    />
  )
}

export default Explorer
