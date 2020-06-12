import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const actions = {
  // Initialize Lists.
  initLists({ commit }) {
    commit('INIT_LISTS')
  },

  // Import file data to store with partial file corruption/tempering checking.
  import({ commit, dispatch }, file) {
    /* Parse the file data and check:
        If storeData is empty.
        If storeData has toReadlist and directories properties.
        If both properties are of type Array.
    */
    const storeData = JSON.parse(file)

    if (storeData) {
      if (
        Object.prototype.hasOwnProperty.call(storeData, 'toReadList') &&
        Object.prototype.hasOwnProperty.call(storeData, 'directories')
      ) {
        if (
          Array.isArray(storeData.toReadList) &&
          Array.isArray(storeData.directories)
        ) {
          // Commit store mutation with new object with file values.
          commit('STORE_IMPORT', {
            toReadList: storeData.toReadList,
            directories: storeData.directories,
          })
          // Re-Initialize Lists.
          dispatch('initLists')
        }
      }
    }
  },

  // Create toRead_Backup.json file.
  export({ commit }) {
    commit('STORE_EXPORT')
  },

  // Set Search value.
  searchAction({ commit }, value) {
    commit('CHANGE_SEARCH', value)
  },

  // Web Scrape Page based on user provided url.
  async addItem({ commit, dispatch }, url) {
    // Increment total pages being currently scraped.
    dispatch('changeWaitingStatus', 1)
    // Set fail message to empty string.
    dispatch('setFailStatus', '')

    // Final object to be pushed to toReadList array.
    let pageInfo = {}
    // Collected data from page.
    let pageDataResults = {}

    // Invoke getSiteData Netlify Function with 'networkidel0' option.
    // On Error re-invoke with 'domcontentloaded' option for faster page loading.
    // If site is not found, getSiteData fails silently and returns an object
    // with notFound property set to true.
    // If both fail set error property to emitted error.
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

    // If image_url is not set from getSiteData scraping,
    // invoke getSiteScreenshot Netlify function (default 'networkidle0' option).
    if (pageDataResults.data.image_url === '') {
      try {
        let imageData = await axios.post(
          '/.netlify/functions/getSiteScreenshot',
          url,
        )

        // Check if getSiteScreenshot failed to capture the site
        if (imageData.data !== '') {
          // Set image_url to returned base64 string
          // and set encoded property to true so styling would be handled differently.
          pageDataResults.data.image_url = `data:image/jpeg;base64,${imageData.data}`
          pageDataResults.data.encoded = true
        } else {
          pageDataResults.data.image_url = await require('@/assets/favicon.png')
            .default
        }
      } catch (err) {
        // On failure set image_url to favicon (chosen because of size).
        pageDataResults.data.image_url = await require('@/assets/favicon.png')
          .default
      }
    }

    /* Set toReadList item id with unique id.
       Default dirId to global dir (-1).
       Set url property with provided url.
       Add Scraped Data or Error property.
    */
    pageInfo.id = uuidv4()
    pageInfo.dirId = -1
    pageInfo.url = url
    pageInfo = {
      ...pageInfo,
      ...pageDataResults.data,
    }

    // If object has neither notFound or error properties
    // commit object to be pushed to toReadList array.
    // Else set fail message.
    if (!pageInfo.notFound && !pageInfo.error) {
      commit('ADD_LIST_ITEM', pageInfo)
    } else {
      dispatch('setFailStatus', `Failed To Fetch ${url}`)
    }

    // Decrement total pages being currently scraped.
    dispatch('changeWaitingStatus', -1)
  },

  // Find toReadList item index based on provided id
  // and commit mutation so it can be removed.
  deleteItem({ commit, state }, id) {
    const itemIndex = state.toReadList.findIndex(item => item.id === id)

    commit('REMOVE_LIST_ITEM', itemIndex)
  },

  // Create a directory object and add it to directories array.
  addDirectory({ commit }, name) {
    const dir = {
      id: uuidv4(),
      name,
    }

    commit('ADD_DIR', dir)
  },

  // Find directory index based on provided id
  // and commit mutation with id and array index
  // so it can be removed and included items return
  // to global directory (-1).
  deleteDirectory({ commit, state }, id) {
    const dirIndex = state.directories.findIndex(dir => dir.id === id)

    commit('REMOVE_DIR', { dirIndex, id })
  },

  // If the user selects an item add an object, containing item id
  // and what directory is in, on selectedItems array.
  // If the user deselects an item find the index of the selected item
  // based on toReadList item id, so it can be removed from selectedItems array.
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

  // If the user selects directory from Actions Pop-Up -> Move To Folder,
  // for each selected item commit moving to specified directory,
  // only if selected item is not already in the specified directory.
  // In the end, clear selectedItems array.
  moveItemsToDirectory({ state, commit, dispatch }, dirId) {
    state.selectedItems.forEach(selectedItem => {
      if (selectedItem.whatDir !== dirId) {
        commit('MOVE_TO_DIR', { dirId, itemId: selectedItem.itemId })
      }
    })

    dispatch('clearSelected')
  },

  // If the user selects Actions Pop-Up -> Delete,
  // for each item in the selectedItems array,
  // delete toReadList array equivalent item based on selected item id.
  // In the end, clear selectedItems array.
  deleteSelected({ state, dispatch }) {
    state.selectedItems.forEach(selectedItem => {
      dispatch('deleteItem', selectedItem.itemId)
    })

    dispatch('clearSelected')
  },

  // Clear selected items array.
  clearSelected({ commit }) {
    commit('CLEAR_SELECTED')
  },

  // Commit item swapping based on droppedOnItemInfo.
  swapItems({ commit }, droppedOnItemInfo) {
    commit('SWAP_ITEMS', droppedOnItemInfo)
  },

  // Commit directory item swapping or add item to directory through dragNdrop
  // based on directory id.
  swapDirs({ commit }, dirId) {
    commit('SWAP_DIRS', dirId)
  },

  // Set temporary object of currently being dragged item object.
  changeDraggedItemInfo({ commit }, value) {
    commit('CHANGE_DRAGGED_ITEM_INFO', value)
  },

  // Increment or Decrement total pages being currently scraped.
  changeWaitingStatus({ commit }, value) {
    commit('CHANGE_WAITING_STATUS', value)
  },

  // Set fail message.
  setFailStatus({ commit }, value) {
    commit('SET_FAIL_STATUS', value)
  },
}

export default actions
