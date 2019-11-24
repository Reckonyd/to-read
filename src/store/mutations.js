import LocalStorageController from '../local_storage/LocalStorageController'

const LSController = new LocalStorageController()

const mutations = {
  INIT_LISTS(state) {
    const lists = LSController.getLocalStorage()

    state.toReadList = lists.toReadList
    state.directories = lists.directories
  },
  CHANGE_SEARCH(state, value) {
    state.search = value
  },
  ADD_LIST_ITEM(state, item) {
    state.toReadList.push(item)
    LSController.addItemToLocalStorage('toReadList', item)
  },
  REMOVE_LIST_ITEM(state, index) {
    state.toReadList.splice(index, 1)
    LSController.removeItemFromLocalStorage('toReadList', index)
  },
  ADD_DIR(state, dir) {
    state.directories.push(dir)
    LSController.addItemToLocalStorage('directories', dir)
  },
  REMOVE_DIR(state, { index, id }) {
    state.directories.splice(index, 1)
    state.toReadList.forEach(item => {
      item.dirId = item.dirId === id ? -1 : item.dirId
    })

    LSController.removeItemFromLocalStorage('directories', index)
    LSController.modifyLocalStorageList('toReadList', state.toReadList)
  },
  MOVE_TO_DIR(state, { dirId, itemId }) {
    state.toReadList.find(item => item.id === itemId).dirId = dirId
    LSController.modifyLocalStorageList('toReadList', state.toReadList)
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
  SWAP_ITEMS(state, droppedOnItemInfo) {
    const firstItemIndex = state.toReadList.findIndex(
      item => item.id === state.draggedItemInfo.id,
    )
    const secondItemIndex = state.toReadList.findIndex(
      item => item.id === droppedOnItemInfo.id,
    )
    const firstItem = state.toReadList.find(
      item => item.id === state.draggedItemInfo.id,
    )
    const secondItem = state.toReadList.find(
      item => item.id === droppedOnItemInfo.id,
    )

    firstItem.dirId = droppedOnItemInfo.dir
    secondItem.dirId = state.draggedItemInfo.dir
    state.toReadList.splice(firstItemIndex, 1, secondItem)
    state.toReadList.splice(secondItemIndex, 1, firstItem)

    LSController.modifyLocalStorageList('toReadList', state.toReadList)
  },
  SWAP_DIRS(state, dirId) {
    state.toReadList.find(
      item => item.id === state.draggedItemInfo.id,
    ).dirId = dirId

    LSController.modifyLocalStorageList('toReadList', state.toReadList)
  },
  CHANGE_DRAGGED_ITEM_INFO(state, value) {
    state.draggedItemInfo = value
  },
  CHANGE_WAITING_STATUS(state, value) {
    state.waiting += value
  },
  SET_FAIL_STATUS(state, value) {
    state.failStatus = value
  },
}

export default mutations
