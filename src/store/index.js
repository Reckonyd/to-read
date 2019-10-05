import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // State
  state: {
    toReadList: [],
    listCount: 3,
    waiting: false,
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
    async addItem({ commit }, url) {
      let pageInfo = {}
      this.state.waiting = true

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

      this.state.waiting = false

      pageInfo = { url, ...response.data }

      if (!pageInfo.notFound) {
        commit('ADD_LIST_ITEM', pageInfo)
      }
    },
    deleteItem({ commit }, id) {
      this.state.listCount--
      commit('REMOVE_LIST_ITEM', this.state.toReadList.indexOf(id))
    },
  },

  // Mutations
  mutations: {
    ADD_LIST_ITEM(state, item) {
      item.id = state.listCount++
      state.toReadList.push(item)
    },
    REMOVE_LIST_ITEM(state, index) {
      state.toReadList.splice(index, 1)
    },
  },
})
