const mutations = {
  INIT_LIST(state, list) {
    state.toReadList = list
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
  CHANGE_WAITING_STATUS(state, value) {
    state.waiting += value
  },
}

export default mutations
