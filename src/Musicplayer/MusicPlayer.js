import React, { Component } from "react"
import styled from "styled-components"

import {
  MusicPlayerMetadata,
  MusicPlayerSongControls,
  MusicPlayerTimeControls,
  MusicPlayerVolumeControls
} from "./"

import { connect } from "react-redux"
import { musicPlayerActions } from "../_actions"

import { appConstants, assetConstants } from "../_constants"

import { Icon } from "../_components"

import { timeConverter, pictureDecoder } from "../_services"

const MusicPlayerContainer = styled.section`
  background: #09123a;
  padding: 1rem;
`

const MusicPlayerSideContainer = styled.div`
  grid-area: musicSide;
  /* height:160px;
  width:160px; */
  display: grid;

  margin: 5px;
  background-color: #1f364d;
  border-radius: 5px;
`

const MusicPlayerHeadContainer = styled.div`
  grid-area: musicHeader;
  margin: 5px;
  background-color: #1f364d;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SVGButton = styled.div`
  padding: 0.5rem;
`

const ExtraControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

class MusicPlayer extends Component {
  state = {
    volume: 0.1,
    mutedVolume: 0,
    currentTime: 0,
    totalTime: 0,
    play: false,
    loop: false,
    seeking: false
  }

  /////////////////
  //Audio Methods//
  /////////////////

  play = _ => {
    if (this.audio.src) {
      this.audio.play()
      this.setState({
        play: true
      })
    }
  }

  pause = _ => {
    this.audio.pause()
    this.setState({
      play: false
    })
  }

  load = _ => this.audio.load()

  volume = setVolume => {
    this.audio.volume = setVolume.target.value
    this.setState({
      volume: setVolume.target.value,
      mutedVolume: setVolume.target.value
    })
  }

  loop = _ => this.setState(prevState => ({ loop: !prevState.loop }))

  onSeekMouseDown = e => this.setState({ seeking: true })

  onSeekChange = e => {
    this.setState({ currentTime: e.target.value })
    this.audio.currentTime = e.target.value
  }

  onSeekMouseUp = e => this.setState({ seeking: false })

  mute = _ => {
    //if is needed to make muted toggable
    if (this.state.volume !== 0) {
      this.audio.volume = 0
      this.setState({
        volume: 0
      })
    } else {
      this.audio.volume = this.state.mutedVolume
      this.setState({
        volume: this.state.mutedVolume
      })
    }
  }

  ////////////////
  //Audio Events//
  ////////////////

  //Fires when the browser can play through the audio/video without stopping for buffering
  onCanPlayThrough = e => this.setState({ totalTime: e.currentTarget.duration })

  //Fires when the current song ended
  onEnded = e =>
    this.state.loop
      ? this.play()
      : this.props.dispatch(musicPlayerActions.nextSong())

  //Fires when the current playback position has changed
  onTimeUpdate = e => {
    if (!this.state.seeking) {
      this.setState({
        currentTime: this.audio.currentTime
      })
    }
  }

  dispatch = action => this.props.dispatch(action)

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.musicPlayer.path !== this.props.musicPlayer.path) {
      this.load()
      this.audio.volume = this.state.volume
      this.play()
    }
  }

  render() {
    return [
      <MusicPlayerSideContainer>
        <ExtraControls>
          <SVGButton
            onClick={_ => this.props.dispatch(musicPlayerActions.shuffleList())}
          >
            <Icon
              title="SHUFFLE"
              width="30"
              height="30"
              color={this.props.musicPlayer.shuffle ? "#FF9D00" : "#F5F5F5"}
            />
          </SVGButton>
          <SVGButton onClick={this.loop}>
            <Icon
              title="LOOP"
              width="35"
              height="35"
              color={this.state.loop ? "#FF9D00" : "#F5F5F5"}
            />
          </SVGButton>
        </ExtraControls>
        <MusicPlayerVolumeControls
          volumeOnClick={this.mute}
          volumeIcon={{
            title:
              this.state.volume === "1"
                ? "SPEAKERFULL"
                : this.state.volume === "0" ? "SPEAKERMUTED" : "SPEAKERHALF",
            width: "28",
            height: "28",
            color: "#FF9D00"
          }}
          volume={this.state.volume}
          volumeOnChange={this.volume}
        />
        <MusicPlayerSongControls
          prevOnClick={_ => this.props.dispatch(musicPlayerActions.prevSong())}
          prevIcon={{
            title: "PREV",
            width: "24",
            height: "24",
            color: "#FF9D00"
          }}
          playOnClick={this.state.play ? this.pause : this.play}
          playIcon={{
            title: this.state.play ? "PAUSE" : "PLAY",
            width: "18",
            height: "24",
            color: "#FF9D00"
          }}
          nextOnClick={_ => this.props.dispatch(musicPlayerActions.nextSong())}
          nextIcon={{
            title: "NEXT",
            width: "24",
            height: "24",
            color: "#FF9D00"
          }}
        />
      </MusicPlayerSideContainer>,
      <MusicPlayerHeadContainer>
        <MusicPlayerMetadata
          songPicture={
            this.props.musicPlayer.metadata
              ? pictureDecoder(this.props.musicPlayer.metadata.picture)
              : assetConstants.MUSICICON
          }
          songTitle={
            this.props.musicPlayer.metadata
              ? this.props.musicPlayer.metadata.title
              : this.props.musicPlayer.path
          }
          songSubtitle={
            this.props.musicPlayer.metadata &&
            this.props.musicPlayer.metadata.artist
          }
        />
        <MusicPlayerTimeControls
          currentTime={this.state.currentTime}
          totalTime={this.state.totalTime}
          convertedCurrentTime={timeConverter(this.state.currentTime)}
          convertedTotalTime={timeConverter(this.state.totalTime)}
          onSeekMouseDown={this.onSeekMouseDown}
          onSeekChange={this.onSeekChange}
          onSeekMouseUp={this.onSeekMouseUp}
        />
      </MusicPlayerHeadContainer>,
      <audio
        //ref
        ref={audio => (this.audio = audio)}
        //attributes + properties
        autoPlay={false}
        controls={false}
        src={
          this.props.musicPlayer.path &&
          `${appConstants.SERVER}/song${this.props.musicPlayer.path}`
        }
        volume={this.state.volume}
        //events
        onCanPlayThrough={this.onCanPlayThrough}
        onEnded={this.onEnded}
        onTimeUpdate={this.onTimeUpdate}
      />
    ]
  }
}

function mapStateToProps(state) {
  const { musicPlayer } = state
  return {
    musicPlayer
  }
}

const connectedMusicPlayer = connect(mapStateToProps)(MusicPlayer)
export { connectedMusicPlayer as MusicPlayer }
