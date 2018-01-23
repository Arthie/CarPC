/**
 * reducers
 *-Redux reducers
 */
import { combineReducers } from 'redux'

import { explorer } from './explorer.reducer'
import { musicPlayer } from './musicPlayer.reducer'

const rootReducer = combineReducers({
  explorer,
  musicPlayer
})

export default rootReducer