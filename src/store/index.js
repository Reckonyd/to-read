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

      pageInfo = { url, ...response.data }

      if (!pageInfo.notFound) {
        dispatch('changeWaitingStatus', -1)
        commit('ADD_LIST_ITEM', pageInfo)
      }
    },
    deleteItem({ commit, state }, id) {
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
    ADD_LIST_ITEM(state, item) {
      item.id = state.toReadList.length + 1
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
