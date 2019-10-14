import axios from 'axios'
import uuidv4 from 'uuid/v4'

const actions = {
  initList({ commit }) {
    let list = []
    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index)
      if (key.indexOf('toReadItem') > -1) {
        list.push(JSON.parse(localStorage.getItem(key)))
      }
    }

    list.sort((a, b) => a.id - b.id)

    commit('INIT_LIST', list)
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
      localStorage.setItem(`toReadItem${pageInfo.id}`, JSON.stringify(pageInfo))

      dispatch('changeWaitingStatus', -1)
      commit('ADD_LIST_ITEM', pageInfo)
    }
  },
  deleteItem({ commit, state }, id) {
    localStorage.removeItem(`toReadItem${id}`)
    commit(
      'REMOVE_LIST_ITEM',
      state.toReadList.findIndex(item => item.id === id),
    )
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
