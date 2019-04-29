import React, { FC, useReducer, useState, Suspense } from "react"

import { AppContainer } from "./components/styles/AppContainer"
import CarDashbord from "./components/CarDashbord"
import Explorer from "./components/Explorer"
import {
  MusicPlayerState,
  MusicReducerAction,
  musicPlayerReducer,
  musicPlayerDefaultState
} from "./utils/musicStateReducer"
import { appConstants } from "./constants"
import GlobalLoading from "./components/GlobalLoading"
import { ExplorerContainer } from "./components/styles/Explorer"
import MusicPlayer from "./components/MusicPlayer"

export interface AppContextType {
  musicPlayerState: MusicPlayerState
  dispatchMusicPlayer: (action: MusicReducerAction) => void
  explorerPath: string
  setExplorerPath: (path: string) => void
}

//@ts-ignore
export const AppContext = React.createContext<AppContextType>(undefined)

const App: FC = () => {
  const [musicPlayerState, dispatch] = useReducer(
    musicPlayerReducer,
    musicPlayerDefaultState
  )
  const [explorerPath, setExplorerPath] = useState(
    appConstants.DEFAULTFOLDERPATH
  )

  return (
    <AppContainer>
      <AppContext.Provider
        value={{
          musicPlayerState,
          dispatchMusicPlayer: (action: MusicReducerAction) => dispatch(action),
          explorerPath,
          setExplorerPath
        }}
      >
        <MusicPlayer />
        <ExplorerContainer>
          <Suspense fallback={<GlobalLoading />}>
            <Explorer path={explorerPath} />
          </Suspense>
        </ExplorerContainer>
      </AppContext.Provider>
      <CarDashbord />
    </AppContainer>
  )
}

export default App
