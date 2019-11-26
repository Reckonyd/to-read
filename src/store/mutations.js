import LocalStorageController from '../local_storage/LocalStorageController'
import { saveAs } from 'file-saver'

// Initialize Local Storage Controller
const LSController = new LocalStorageController()

const mutations = {
  // Get temporary object containing toReadList and directories arrays.
  // Overwrite both arrays' values.
  INIT_LISTS(state) {
    const lists = LSController.getLocalStorage()

    state.toReadList = lists.toReadList
    state.directories = lists.directories
  },

  // Set Local Storage entry with imported values from backup file.
  STORE_IMPORT(state, storeData) {
    LSController.setLocalStorage(storeData)
  },

  // Create a temporary object with both toReadList and directories arrays.
  // Create a Blob object with the JSON string format of this object.
  // Create and download the backup file to the user's machine.
  STORE_EXPORT(state) {
    const data = {
      toReadList: state.toReadList,
      directories: state.directories,
    }
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })

    saveAs(blob, 'toRead_Backup.json')
  },

  // Set search value based on user input.
  CHANGE_SEARCH(state, value) {
    state.search = value
  },

  // Push newly created toReadList item to toReadList array.
  // Change Local Storage entry to reflect the current store state.
  ADD_LIST_ITEM(state, item) {
    state.toReadList.push(item)
    LSController.addItemToLocalStorage('toReadList', item)
  },

  // Delete toReadList item from toReadList array based on its index.
  // Change Local Storage entry to reflect the current store state.
  REMOVE_LIST_ITEM(state, index) {
    state.toReadList.splice(index, 1)
    LSController.removeItemFromLocalStorage('toReadList', index)
  },

  // Push newly created directory item to directories array.
  // Change Local Storage entry to reflect the current store state.
  ADD_DIR(state, dir) {
    state.directories.push(dir)
    LSController.addItemToLocalStorage('directories', dir)
  },

  // Delete directory item from directories array based on its index.
  /* Check every item in toReadList array:
      If its directory id equals current directory (being removed) id, 
      set that value to global directory (-1).
      Else keep the value the same.
  */
  // Change Local Storage entry to reflect the current store state.
  REMOVE_DIR(state, { dirIndex, id }) {
    state.directories.splice(dirIndex, 1)
    state.toReadList.forEach(item => {
      item.dirId = item.dirId === id ? -1 : item.dirId
    })

    LSController.removeItemFromLocalStorage('directories', dirIndex)
    LSController.modifyLocalStorageList('toReadList', state.toReadList)
  },

  // Find toReadList item being selected for changing directories
  // and set its directory id value to the specified directory id.
  // Change Local Storage entry to reflect the current store state.
  MOVE_TO_DIR(state, { dirId, itemId }) {
    state.toReadList.find(item => item.id === itemId).dirId = dirId
    LSController.modifyLocalStorageList('toReadList', state.toReadList)
  },

  // Add user selected item to selectedItems array.
  ADD_SELECTED(state, selected) {
    state.selectedItems.push(selected)
  },

  // Remove selected item from selectedItems array
  // when the user deselects it.
  REMOVE_SELECTED(state, index) {
    state.selectedItems.splice(index, 1)
  },

  // Set selectedItems array to an empty array.
  CLEAR_SELECTED(state) {
    state.selectedItems = []
  },

  /* 
    Comment naming scheme
      DroppedOn => item that user drops dragged item on. 
  */
  // Find both dragged and DroppedOn item index respectively.
  // Find both dragged and DroppedOn item object respectively.
  // Swap directory id values between dragged and DroppedOn items.
  // Swap both items' position in toReadList array.
  // Change Local Storage entry to reflect the current store state.
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

  // Find item that is currently being dragged and change its
  // directory id to the id of the directory that the user drops it on.
  // Change Local Storage entry to reflect the current store state.
  SWAP_DIRS(state, dirId) {
    state.toReadList.find(
      item => item.id === state.draggedItemInfo.id,
    ).dirId = dirId

    LSController.modifyLocalStorageList('toReadList', state.toReadList)
  },

  // Set temporary object of currently being dragged item object.
  CHANGE_DRAGGED_ITEM_INFO(state, value) {
    state.draggedItemInfo = value
  },

  // Increment or Decrement total pages being currently scraped.
  CHANGE_WAITING_STATUS(state, value) {
    state.waiting += value
  },

  // Set fail message.
  SET_FAIL_STATUS(state, value) {
    state.failStatus = value
  },
}

export default mutations
