//explorer change directory
const changeDirectory = data => {
  return {
    type: "CHANGE_DIRECTORY",
    data
  }
}

//change song
const changeSong = data => {
  return {
    type: "CHANGE_SONG",
    data
  }
}

export const explorerActions = { changeDirectory, changeSong }
