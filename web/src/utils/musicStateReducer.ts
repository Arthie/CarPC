import { MusicItem } from "../graphql/generated/types"

const getShuffleList = (list: MusicItem[], path: string) => {
  // check for songlist not null
  //copy array not refference
  let a = list.slice()

  //shuffle function
  //const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)
  //shuffle array
  a.sort(() => Math.random() - 0.5)

  //find current song in list
  const indexCurrent = list.findIndex((item: MusicItem) => {
    return item.path === path
  })

  if (indexCurrent !== -1) {
    //remove current song from list
    a.splice(indexCurrent, 1)

    //add current song to start of songlist
    a.unshift(list[indexCurrent])
  }

  //update song list
  return a
}

export interface MusicPlayerState {
  song?: MusicItem
  songList?: MusicItem[]
  shuffleList?: MusicItem[]
  shuffle: boolean
}

export interface MusicReducerAction {
  type: "SONG_CHANGE" | "NEXT_SONG" | "PREV_SONG" | "SHUFFLE_LIST"
  data: {
    song?: MusicItem
    songList?: MusicItem[]
  }
}

export const musicPlayerDefaultState: MusicPlayerState = {
  shuffle: false
}

export const musicPlayerReducer = (
  state: MusicPlayerState,
  action: MusicReducerAction
) => {
  switch (action.type) {
    case "SONG_CHANGE": {
      const { song, songList } = action.data

      //to do return state??
      if (!song) {
        console.log("no song")
        return state
      }
      if (!songList) {
        console.log("no songlist")
        return state
      }

      return {
        ...state,
        song,
        songList
      }
    }
    case "NEXT_SONG": {
      const { song: currentSong, songList, shuffle, shuffleList } = state
      if (!currentSong) {
        console.log("no song list")
        return state
      }

      if (!songList) {
        console.log("no song list")
        return state
      }

      if (shuffle && !shuffleList) {
        console.log("no shuffle list")
        return state
      }

      const nextSong = (
        song: MusicItem,
        songList: MusicItem[]
      ): MusicItem | undefined => {
        const currentIndex = songList.findIndex(item => item.path === song.path)
        return songList[currentIndex + 1]
      }

      const song = shuffle
        ? shuffleList && nextSong(currentSong, shuffleList)
        : nextSong(currentSong, songList)

      if (song) {
        return {
          ...state,
          song
        }
      }

      return state
    }
    case "PREV_SONG": {
      const { song: currentSong, songList, shuffle, shuffleList } = state
      if (!currentSong) {
        console.log("no song list")
        return state
      }

      if (!songList) {
        console.log("no song list")
        return state
      }

      if (shuffle && !shuffleList) {
        console.log("no shuffle list")
        return state
      }

      const prevSong = (
        song: MusicItem,
        songList: MusicItem[]
      ): MusicItem | undefined => {
        const currentIndex = songList.findIndex(item => item.path === song.path)
        return songList[currentIndex - 1]
      }

      const song = shuffle
        ? shuffleList && prevSong(currentSong, shuffleList)
        : prevSong(currentSong, songList)

      if (song) {
        return {
          ...state,
          song
        }
      }

      return state
    }
    case "SHUFFLE_LIST": {
      if (!state.shuffle && state.song && state.songList) {
        const shuffleList = getShuffleList(state.songList, state.song.path)
        if (shuffleList) {
          return {
            ...state,
            shuffleList,
            shuffle: true
          }
        }
      }
      return {
        ...state,
        shuffle: false
      }
    }
    default:
      return state
  }
}
