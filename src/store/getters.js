const getters = {
  getFilteredToReadList: state => (search = ' ') => {
    if (state.toReadList.length !== 0) {
      return state.toReadList
        .filter(
          item => item.title.toLowerCase().indexOf(search.toLowerCase()) > -1,
        )
        .reverse()
    }
    return []
  },
}

export default getters
