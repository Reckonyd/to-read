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
    state.directories.find(dir => dir.id === dirId).itemList.push(itemId)
  },
  REMOVE_FROM_DIR(state, { dirId, itemId }) {
    let oldContainingDir = state.directories.find(dir => dir.id === dirId)
      .itemList
    oldContainingDir.splice(oldContainingDir.indexOf(itemId), 1)
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
  CHANGE_WAITING_STATUS(state, value) {
    state.waiting += value
  },
}

export default mutations
