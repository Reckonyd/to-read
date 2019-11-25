const getters = {
  getFilteredToReadList: state => {
    if (state.toReadList.length !== 0) {
      return state.toReadList
        .filter(
          item =>
            item.title &&
            item.title.toLowerCase().indexOf(state.search.toLowerCase()) > -1,
        )
        .reverse()
    }
    return []
  },
  getDirectories: state => {
    return state.directories.filter(dir => dir.id && dir.id !== -1 && dir.name)
  },
}

export default getters
