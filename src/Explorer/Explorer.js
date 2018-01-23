import React, { Component } from "react"
import styled from "styled-components"

import { ExplorerItem } from "./ExplorerItem"
import { appConstants, assetConstants } from "../_constants"
import { timeConverter, pictureDecoder } from "../_services"

import { connect } from "react-redux"
import { explorerActions } from "../_actions"

const ExplorerContainer = styled.section`
  grid-area: explorer;
  margin: 5px;
  background-color: #1f364d;
  border-radius: 5px;
`

const ExplorerHeader = styled.header`
  position: relative;
  height: 30px;
  background-color: #1f364d;
  border-bottom-style: solid;
  border-radius: 5px 5px 0px 0px;
  border-width: 5px;
  border-color: #1f364d;
  /* box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25); */
  display: flex;
  flex-direction: row;
`

const ExplorerContent = styled.article`
  overflow: hidden;
  overflow-y: scroll;
  height: 360px;

  &::-webkit-scrollbar {
    display: none;
  }
`

const ExplorerButton = styled.div`
  margin: 5px 5px 0px 5px;
  background-color: #1f364d;
  border-radius: 5px;
  cursor: pointer;
  height: 20px;
  font-size: 0.8rem;
  padding: 0 5px;
  display: flex;
  align-items: center;
  font-weight: 900;
  border-style: solid;
  border-width: 1px;
  border-color: #ff9d00;
`

class Explorer extends Component {
  itemMusic = (item, index) => {
    const onClick = _ => this.setSong(item)
    const iconSrc = item.metadata
      ? pictureDecoder(item.metadata.picture)
      : assetConstants.MUSICICON
    const title = item.metadata ? item.metadata.title : item.path
    const time = item.metadata ? timeConverter(item.metadata.duration) : ""
    const subtitle = item.metadata ? `${item.metadata.artist} - ${time}` : ""
    const selected = item.path === this.props.musicPlayer.path
    return (
      <ExplorerItem
        key={index}
        index={index}
        onClick={onClick}
        iconSrc={iconSrc}
        title={title}
        subtitle={subtitle}
        selected={selected}
      />
    )
  }

  itemDirectory = (item, index) => {
    const onClick = _ => this.getFolder(item.path)
    const iconSrc = assetConstants.MUSICFOLDERICON
    const title = item.path.replace(new RegExp("/", "g"), "")
    const subtitle = "folder"
    return (
      <ExplorerItem
        key={index}
        index={index}
        onClick={onClick}
        iconSrc={iconSrc}
        title={title}
        subtitle={subtitle}
      />
    )
  }

  list = folderData => {
    if (folderData) {
      //keep track of files to subtract from index
      let files = 0
      return folderData.map((item, index) => {
        switch (item.type) {
          case "music":
            return this.itemMusic(item, index - files)
          case "directory":
            return this.itemDirectory(item, index - files)
          default:
            files++
            return null
        }
      })
    }
  }

  getFolder = async folderPath => {
    try {
      const response = await fetch(
        `${appConstants.SERVER}/folder?path=${folderPath}`
      )
      const responseJson = await response.json()
      this.props.dispatch(
        explorerActions.changeDirectory({
          folderPath,
          folderData: responseJson
        })
      )
    } catch (err) {
      console.log(err)
    }
  }

  setSong = song => {
    let songList = this.props.explorer.folderData.filter(item => {
      return item.type === "music" ? item : null
    })
    this.props.dispatch(explorerActions.changeSong({ song, songList }))
  }

  componentWillMount() {
    this.getFolder(appConstants.DEFAULTFOLDERPATH)
  }

  render() {
    return (
      <ExplorerContainer>
        <ExplorerHeader>
          <ExplorerButton onClick={_ => this.getFolder(appConstants.DEFAULTFOLDERPATH)}>
            <span>HOME</span>
          </ExplorerButton>
        </ExplorerHeader>
        <ExplorerContent>
          {this.list(this.props.explorer.folderData)}
        </ExplorerContent>
      </ExplorerContainer>
    )
  }
}

function mapStateToProps(state) {
  const { explorer, musicPlayer } = state
  return {
    explorer,
    musicPlayer
  }
}

const connectedExplorer = connect(mapStateToProps)(Explorer)
export { connectedExplorer as Explorer }
