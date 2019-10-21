import axios from 'axios'
import uuidv4 from 'uuid/v4'
import LocalStorageController from '../local_storage/LocalStorageController'

const LSController = new LocalStorageController()

const actions = {
  initLists({ commit }) {
    const lists = LSController.getLocalStorage()
    commit('INIT_LISTS', lists)
  },
  async addItem({ commit, dispatch }, url) {
    let pageInfo = {}

    dispatch('changeWaitingStatus', 1)

    let response = await axios({
      method: 'POST',
      url:
        'https://api.apify.com/v2/acts/reckonyd~scraper-for-toread/run-sync?token=' +
        process.env.API_KEY,
      data: {
        url,
        width: 1366,
        height: 768,
      },
      config: {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    })

    pageInfo.id = uuidv4()
    pageInfo.url = url
    pageInfo = { ...pageInfo, ...response.data }

    if (pageInfo.encoded) {
      pageInfo.image_url = `data:image/jpeg;base64,${pageInfo.image_url}`
    }

    if (!pageInfo.notFound) {
      LSController.addItemToLocalStorage('toReadList', pageInfo)
      dispatch('changeWaitingStatus', -1)
      commit('ADD_LIST_ITEM', pageInfo)
    }
  },
  deleteItem({ commit, state }, id) {
    const itemIndex = state.toReadList.findIndex(item => item.id === id)

    LSController.removeItemFromLocalStorage('toReadList', itemIndex)
    commit('REMOVE_LIST_ITEM', itemIndex)
  },
  addDirectory({ commit }, name) {
    const dir = {
      id: uuidv4(),
      name,
      itemList: [],
    }

    LSController.addItemToLocalStorage('directories', dir)
    commit('ADD_DIR', dir)
  },
  deleteDirectory({ commit, state }, id) {
    const dirIndex = state.directories.findIndex(dir => dir.id === id)

    LSController.removeItemFromLocalStorage('directories', dirIndex)
    commit('REMOVE_DIR', dirIndex)
  },
  selectAction({ commit, state }, { id, dirId, isSelected }) {
    if (isSelected) {
      commit('ADD_SELECTED', { itemId: id, whatDir: dirId })
    } else {
      commit(
        'REMOVE_SELECTED',
        state.selectedItems.findIndex(
          selectedItem => selectedItem.itemId === id,
        ),
      )
    }
  },
  moveItemsToDirectory({ state, commit, dispatch }, dirId) {
    state.selectedItems.forEach(selectedItem => {
      if (selectedItem.whatDir !== dirId) {
        if (dirId != -1) {
          commit('MOVE_TO_DIR', { dirId, itemId: selectedItem.itemId })
        }

        if (selectedItem.whatDir) {
          commit('REMOVE_FROM_DIR', {
            dirId: selectedItem.whatDir,
            itemId: selectedItem.itemId,
          })
        }
      }
    })

    LSController.modifyLocalStorageList('directories', state.directories)

    dispatch('clearSelected')
  },
  deleteSelected({ state, dispatch }) {
    state.selectedItems.forEach(selectedItem => {
      dispatch('deleteItem', selectedItem.itemId)
    })
    dispatch('clearSelected')
  },
  clearSelected({ commit }) {
    commit('CLEAR_SELECTED')
  },
  swapItems({ commit, state }, { firstID, secondID }) {
    const firstItem = state.toReadList.find(item => item.id === firstID)
    const secondItem = state.toReadList.find(item => item.id === secondID)
    const firstItemIndex = state.toReadList.indexOf(firstItem)
    const secondItemIndex = state.toReadList.indexOf(secondItem)
    commit('SWAP_ITEMS', {
      firstItemIndex,
      firstItem,
      secondItemIndex,
      secondItem,
    })
  },
  changeWaitingStatus({ commit }, value) {
    commit('CHANGE_WAITING_STATUS', value)
  },
}

export default actions
