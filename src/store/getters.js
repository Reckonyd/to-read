const getters = {
  getFilteredToReadList: state => {
    if (state.toReadList.length !== 0) {
      return state.toReadList
        .filter(
          item =>
            item.title.toLowerCase().indexOf(state.search.toLowerCase()) > -1,
        )
        .reverse()
    }
    return []
  },
}

export default getters
