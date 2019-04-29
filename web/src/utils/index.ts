//time arg is in seconds
const timeConverter = (time: number) => {
  //check if more then hour
  if (time < 3600) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`
  }

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor((time % 3600) % 60)
  return `${hours}:${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`
}
//return time in 00:00 or 00:00:00 format

export { timeConverter }
