//explorer change directory
const nextSong = _ => {
  return {
    type: "NEXT_SONG"
  }
}

const prevSong = _ => {
  return {
    type: "PREV_SONG"
  }
}

const shuffleList = _ => {
  return {
    type: "SHUFFLE_LIST"
  }
}

export const musicPlayerActions = { shuffleList, nextSong, prevSong }
