import { assetConstants } from "../_constants"

//time arg is in seconds
const timeConverter = time => {
  //check if more then hour
  if (time < 3600) {
    return `${Math.floor(time / 60)}:${
      Math.floor(time % 60).toString().length !== 1
        ? Math.floor(time % 60)
        : 0 + Math.floor(time % 60).toString()
    }`
  }
  return `${Math.floor(time / 3600)}:${Math.floor((time % 3600) / 60)}:${
    Math.floor((time % 3600) % 60).toString().length !== 1
      ? Math.floor((time % 3600) % 60)
      : 0 + Math.floor((time % 3600) % 60).toString()
  }`
}
//return time in 00:00 or 00:00:00 format

//music metadata picture decoder
const pictureDecoder = blob => {
  if (blob.length) {
    return (
      "data:image/png;base64," +
      btoa(
        new Uint8Array(blob[0].data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )
    )
  }
  return assetConstants.MUSICICON
}

//no arrow function possible needs to keep called context
//iterator takes array makes it possible to step to next or prev item in array
function makeIterator(index = 0) {
  const items = this
  return {
    next: _ => {
      if (index < items.length) index++
      return { value: items[index], done: index >= items.length }
    },
    prev: _ => {
      if (index >= 0) index--
      return { value: items[index], done: index < 0 }
    }
  }
}

const getShuffleList = (list,path) => {
  // check for songlist not null
  if (list) {
    //copy array not refference
    let a = list.slice()

    //shuffle function
    //const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)
    //shuffle array
    a.sort(_ => Math.random() - 0.5)

    //find current song in list
    const indexCurrent = list.findIndex(item => {
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
  return null
}

export { timeConverter, pictureDecoder, makeIterator, getShuffleList }
