export const explorer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_DIRECTORY":
      const { folderPath , folderData} = action.data
      return {
        ...state,
        folderPath,
        folderData
      }
    default:
      return state
  }
}
