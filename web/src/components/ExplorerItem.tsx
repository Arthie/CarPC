import React, { FC } from "react"
import {
  ItemContainer,
  ItemImg,
  ItemInfo,
  ItemTitle,
  ItemSubtitle,
  SelectedItemContainer,
  ItemIndex
} from "./styles/ExplorerItem"

export interface ExporerItemProps {
  index?: number
  onClick: () => void
  iconSrc: string
  title: string
  subtitle: string
  selected?: boolean
}

const ExplorerItem: FC<ExporerItemProps> = props => {
  const { index, onClick, iconSrc, title, subtitle, selected = false } = props

  const content = (
    <>
      <ItemIndex>{typeof index === "number" ? index + 1 : null}</ItemIndex>
      <ItemImg src={iconSrc} alt="item-icon" />
      <ItemInfo>
        <ItemTitle>{title}</ItemTitle>
        <ItemSubtitle>{subtitle}</ItemSubtitle>
      </ItemInfo>
    </>
  )

  if (selected) {
    return (
      <SelectedItemContainer key={index} onClick={onClick}>
        {content}
      </SelectedItemContainer>
    )
  }

  return (
    <ItemContainer key={index} onClick={onClick}>
      {content}
    </ItemContainer>
  )
}

export default ExplorerItem
