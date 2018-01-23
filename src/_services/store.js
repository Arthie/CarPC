import { createStore, applyMiddleware } from "redux"
import rootReducer from "../_reducers"

import { appConstants } from "../_constants"

const defaultState = {
  app: {
  },
  explorer: {
    folderPath: appConstants.DEFAULTFOLDERPATH,
    folderData: null,
  },
  musicPlayer: {
    path:null,
    metadata:null,
    songList:null,
    shuffleList:null,
    shuffle:false
  }
}

export const store = createStore(
  rootReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
