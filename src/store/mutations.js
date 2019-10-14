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
  SWAP_ITEMS(state, { firstID, secondID }) {
    const firstItem = state.toReadList.find(item => item.id === firstID)
    const secondItem = state.toReadList.find(item => item.id === secondID)
    const firstItemIndex = state.toReadList.indexOf(firstItem)
    const secondItemIndex = state.toReadList.indexOf(secondItem)
    state.toReadList.splice(firstItemIndex, 1, secondItem)
    state.toReadList.splice(secondItemIndex, 1, firstItem)
  },
  CHANGE_WAITING_STATUS(state, value) {
    state.waiting += value
  },
}

export default mutations
