const mutations = {
  INIT_LISTS(state, lists) {
    state.toReadList = lists.toReadList
    state.directories = lists.directories
  },
  ADD_LIST_ITEM(state, item) {
    state.toReadList.push(item)
  },
  REMOVE_LIST_ITEM(state, index) {
    state.toReadList.splice(index, 1)
  },
  ADD_DIR(state, dir) {
    state.directories.push(dir)
  },
  REMOVE_DIR(state, index) {
    state.directories.splice(index, 1)
  },
  MOVE_TO_DIR(state, { dirId, itemId }) {
    state.toReadList.find(item => item.id === itemId).dirId = dirId
  },
  ADD_SELECTED(state, selected) {
    state.selectedItems.push(selected)
  },
  REMOVE_SELECTED(state, index) {
    state.selectedItems.splice(index, 1)
  },
  CLEAR_SELECTED(state) {
    state.selectedItems = []
  },
  SWAP_ITEMS(
    state,
    { firstItemIndex, firstItem, secondItemIndex, secondItem },
  ) {
    state.toReadList.splice(firstItemIndex, 1, secondItem)
    state.toReadList.splice(secondItemIndex, 1, firstItem)
  },
  CHANGE_WAITING_STATUS(state, value) {
    state.waiting += value
  },
}

export default mutations
