import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // State
  state: {
    toReadList: [],
    waiting: 0,
  },

  // Getters
  getters: {
    getFilteredToReadList: state => (search = ' ') => {
      if (state.toReadList.length !== 0) {
        return state.toReadList
          .filter(
            item => item.title.toLowerCase().indexOf(search.toLowerCase()) > -1,
          )
          .reverse()
      }
      return []
    },
  },

  // Actions
  actions: {
    initList({ commit }) {
      let list = []
      for (let index = 0; index < localStorage.length; index++) {
        let key = localStorage.key(index)
        if (key.indexOf('toReadItem') > -1) {
          list.push(JSON.parse(localStorage.getItem(key)))
        }
      }

      commit('INIT_LIST', list)
    },
    async addItem({ commit, dispatch, state }, url) {
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

      pageInfo.id = state.toReadList.length + 1
      pageInfo.url = url
      pageInfo = { ...pageInfo, ...response.data }

      if (pageInfo.encoded) {
        pageInfo.image_url = `data:image/jpeg;base64,${pageInfo.image_url}`
      }

      if (!pageInfo.notFound) {
        localStorage.setItem(
          `toReadItem${pageInfo.id}`,
          JSON.stringify(pageInfo),
        )

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
    changeWaitingStatus({ commit }, value) {
      commit('CHANGE_WAITING_STATUS', value)
    },
  },

  // Mutations
  mutations: {
    INIT_LIST(state, list) {
      state.toReadList = list
    },
    ADD_LIST_ITEM(state, item) {
      state.toReadList.push(item)
    },
    REMOVE_LIST_ITEM(state, index) {
      state.toReadList.splice(index, 1)
    },
    CHANGE_WAITING_STATUS(state, value) {
      state.waiting += value
    },
  },
})
