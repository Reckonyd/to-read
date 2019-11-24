import axios from 'axios'
import uuidv4 from 'uuid/v4'

const actions = {
  initLists({ commit }) {
    commit('INIT_LISTS')
  },
  import({ commit, dispatch }, file) {
    if (file.type === 'application/json') {
      file.text().then(text => {
        const storeData = JSON.parse(text)
        if (storeData.exported) {
          console.log('Exported Pass')
          commit('STORE_IMPORT', {
            toReadList: storeData.toReadList,
            directories: storeData.directories,
          })
          dispatch('initLists')
        }
      })
    }
  },
  export({ commit }) {
    commit('STORE_EXPORT')
  },
  searchAction({ commit }, value) {
    commit('CHANGE_SEARCH', value)
  },
  async addItem({ commit, dispatch }, url) {
    dispatch('changeWaitingStatus', 1)
    dispatch('setFailStatus', '')

    let pageInfo = {}
    let pageDataResults = {}

    try {
      pageDataResults = await axios.post(
        '/.netlify/functions/getSiteData',
        JSON.stringify({ url, wait: 'networkidle0' }),
      )
    } catch (err) {
      try {
        pageDataResults = await axios.post(
          '/.netlify/functions/getSiteData',
          JSON.stringify({ url, wait: 'domcontentloaded' }),
        )
      } catch (err) {
        pageInfo.error = err
      }
    }

    if (pageDataResults.data.image_url === '') {
      try {
        let imageData = await axios.post(
          '/.netlify/functions/getSiteScreenshot',
          url,
        )

        pageDataResults.data.image_url = `data:image/jpeg;base64,${imageData.data}`
        pageDataResults.data.encoded = true
      } catch (err) {
        pageDataResults.data.image_url = '/assets/android-chrome-256x256.png'
      }
    }

    pageInfo.id = uuidv4()
    pageInfo.dirId = -1
    pageInfo.url = url
    pageInfo = {
      ...pageInfo,
      ...pageDataResults.data,
    }

    if (!pageInfo.notFound && !pageInfo.error) {
      commit('ADD_LIST_ITEM', pageInfo)
    } else {
      dispatch('setFailStatus', `Failed To Fetch ${url}`)
    }

    dispatch('changeWaitingStatus', -1)
  },
  deleteItem({ commit, state }, id) {
    const itemIndex = state.toReadList.findIndex(item => item.id === id)

    commit('REMOVE_LIST_ITEM', itemIndex)
  },
  addDirectory({ commit }, name) {
    const dir = {
      id: uuidv4(),
      name,
    }

    commit('ADD_DIR', dir)
  },
  deleteDirectory({ commit, state }, id) {
    const dirIndex = state.directories.findIndex(dir => dir.id === id)

    commit('REMOVE_DIR', { dirIndex, id })
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
        commit('MOVE_TO_DIR', { dirId, itemId: selectedItem.itemId })
      }
    })

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
  swapItems({ commit }, droppedOnItemInfo) {
    commit('SWAP_ITEMS', droppedOnItemInfo)
  },
  swapDirs({ commit }, dirId) {
    commit('SWAP_DIRS', dirId)
  },
  changeDraggedItemInfo({ commit }, value) {
    commit('CHANGE_DRAGGED_ITEM_INFO', value)
  },
  changeWaitingStatus({ commit }, value) {
    commit('CHANGE_WAITING_STATUS', value)
  },
  setFailStatus({ commit }, value) {
    commit('SET_FAIL_STATUS', value)
  },
}

export default actions
