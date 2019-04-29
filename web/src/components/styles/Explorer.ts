import styled from "styled-components"

export const ExplorerContainer = styled.section`
  grid-area: explorer;
  display: flex;
  flex-direction: column;

  margin: 0.5rem;
  background-color: #1f364d;
  border-radius: 0.5rem;
`

export const ExplorerHeader = styled.header`
  display: flex;
  flex-direction: row;
  height: 3rem;
  background-color: #1f364d;
  border-bottom-style: solid;
  border-radius: 0.5rem 0.5rem 0 0;
  border-width: 0.5rem;
  border-color: #1f364d;
  /* box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25); */
`

export const ExplorerContent = styled.article`
  overflow: hidden;
  overflow-y: scroll;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ExplorerButton = styled.div`
  margin: 0.5rem 0.5rem 0 0.5rem;
  background-color: #1f364d;
  border-radius: 0.5rem;
  cursor: pointer;
  height: 2rem;
  font-size: 0.8rem;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  font-weight: 900;
  border-style: solid;
  border-width: 0.1rem;
  border-color: #ff9d00;
`
