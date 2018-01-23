import React, { PureComponent } from "react"
import styled from "styled-components"

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 5px 5px 0 5px;
`

const MetadataImg = styled.img`
  height: 40px;
  width: 40px;
`

const MetadataText = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`

const MetadataTitle = styled.span`
  font-size: 1.2rem;
`

const MetadataSubtitle = styled.span`
  font-size: 1rem;
  color: #9cb3c9;
`

class MusicPlayerMetadata extends PureComponent {
  render() {
    const { songPicture, songTitle, songSubtitle } = this.props
    return (
      <Metadata>
        <MetadataImg src={songPicture} alt="song art" />
        <MetadataText>
          <MetadataTitle>{songTitle}</MetadataTitle>
          <MetadataSubtitle>{songSubtitle}</MetadataSubtitle>
        </MetadataText>
      </Metadata>
    )
  }
}

export { MusicPlayerMetadata }
