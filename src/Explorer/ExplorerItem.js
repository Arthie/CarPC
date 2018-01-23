import React, { PureComponent } from "react"
import styled from "styled-components"

const ItemContainer = styled.div`
  margin: 0 5px 5px 5px;
  padding: 0 5px 0 5px;
  display: grid;
  background-color: #274059;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  grid-template-columns: 30px 30px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "index picture titel";
  align-items: center;

  /*hover*/
  &:hover {
    background-color: #325679;
  }

  /*selected*/
  ${props =>
    props.selected
      ? `
      border-style: solid;
      border-width: 3px;
      border-color:#FF9D00;
      `
      : ``};
`

const ItemIndex = styled.div`
  grid-area: index;
`

const ItemImg = styled.img`
  grid-area: picture;
  height: 30px;
`

const ItemInfo = styled.div`
  grid-area: titel;
  padding-left: 5px;
  height: 30px;
`

const ItemTitle = styled.div`
  font-size: 1rem;
`

const ItemSubtitle = styled.div`
  font-size: 0.8rem;
  color: #9cb3c9;
`

class ExplorerItem extends PureComponent {
  render() {
    const {
      index,
      onClick,
      iconSrc,
      title,
      subtitle,
      selected = false
    } = this.props
    return (
      <ItemContainer selected={selected} key={index} onClick={onClick}>
        <ItemIndex>
          <span>{index + 1}</span>
        </ItemIndex>
        <ItemImg src={iconSrc} alt="item-icon" />
        <ItemInfo>
          <ItemTitle>{title}</ItemTitle>
          <ItemSubtitle>{subtitle}</ItemSubtitle>
        </ItemInfo>
      </ItemContainer>
    )
  }
}

export { ExplorerItem }
