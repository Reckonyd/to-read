const getters = {
  // Return all items of toReadList array based on user search value.
  // Each item is filtered based on its title, being the same as the search value.
  // The resulting array is reversed before it is returned, so items will be shown
  // with the most recently added first.
  // Also every item object is checked for the presense of title property,
  // because imported backup file could be corrupted/tempered.
  // If toReadList array is empty returns an empty array.
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

  // Store corruption measure, due to backup file being corrupted/tempered.
  // Returns all directory objects that have id and name properties
  // and directory id is not set to global directory (-1).
  getDirectories: state => {
    return state.directories.filter(dir => dir.id && dir.id !== -1 && dir.name)
  },
}

export default getters
