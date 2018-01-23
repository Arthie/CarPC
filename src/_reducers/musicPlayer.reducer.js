import { makeIterator, getShuffleList } from "../_services"

export const musicPlayer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_SONG":
      const { song, songList } = action.data
      songList[Symbol.iterator] = makeIterator
      const indexCurrent = songList.findIndex(item => {
        return item.path === song.path
      })
      const songIterator = songList[Symbol.iterator](indexCurrent)
      return {
        ...state,
        path: song.path,
        metadata: song.metadata,
        songList,
        songIterator
      }

    case "NEXT_SONG":
      if (state.songList) {
        const next = state.shuffle
          ? state.shuffleIterator.next()
          : state.songIterator.next()
        if (!next.done) {
          const { path } = next.value
          console.log("next", path)
          return {
            ...state,
            path
          }
        }
      }
      return {
        ...state
      }

    case "PREV_SONG":
      if (state.songList) {
        const prev = state.shuffle
          ? state.shuffleIterator.prev()
          : state.songIterator.prev()
        if (!prev.done) {
          const { path } = prev.value
          console.log("prev", path)
          return {
            ...state,
            path
          }
        }
      }
      return {
        ...state
      }

    case "SHUFFLE_LIST":
      if (!state.shuffle) {
        const shuffleList = getShuffleList(state.songList, state.path)
        if (shuffleList) {
          shuffleList[Symbol.iterator] = makeIterator
          const shuffleIterator = shuffleList[Symbol.iterator]()
          return {
            ...state,
            shuffleList,
            shuffleIterator,
            shuffle: true
          }
        }
      }
      return {
        ...state,
        shuffle: false
      }
    default:
      return state
  }
}
