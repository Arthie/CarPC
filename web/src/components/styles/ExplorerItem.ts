import styled from "styled-components"

export const ItemContainer = styled.div`
  display: grid;
  margin: 0 0.5rem 0.5rem 0.5rem;
  padding: 0 0.5rem 0 0.5rem;

  background-color: #274059;
  border-radius: 0.5rem;
  cursor: pointer;
  height: 4rem;
  grid-template-columns: 3rem 3rem 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "index picture titel";
  align-items: center;

  /*hover*/
  &:hover {
    background-color: #325679;
  }
`

export const SelectedItemContainer = styled(ItemContainer)`
  border-style: solid;
  border-width: 0.3rem;
  border-color: #ff9d00;
`

export const ItemIndex = styled.div`
  grid-area: index;
  justify-self: center;
`

export const ItemImg = styled.img`
  grid-area: picture;
  height: calc(100% - 1rem);
`

export const ItemInfo = styled.div`
  grid-area: titel;
  display: grid;

  grid-template-columns: auto;
  grid-template-rows: auto auto;

  grid-row-gap: 0.3rem;
  align-items: center;
  padding-left: 0.5rem;
  height: 100%;
`

export const ItemTitle = styled.span`
  align-self: end;
`

export const ItemSubtitle = styled.span`
  align-self: start;
  font-size: 0.8rem;
  color: #9cb3c9;
`
