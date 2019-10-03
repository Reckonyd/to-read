import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // State
  state: {
    toReadList: [],
    listCount: 0,
  },

  // Getters
  getters: {
    getFilteredToReadList: state => (search = ' ') => {
      if (state.toReadList.length !== 0) {
        return state.toReadList.filter(
          item => item.title.toLowerCase().indexOf(search.toLowerCase()) === 0,
        )
      }
      return []
    },
  },

  // Actions
  actions: {
    async addItem({ commit }, url) {
      let pageInfo = {}

      await axios({
        method: 'POST',
        url:
          'https://api.apify.com/v2/acts/reckonyd~scraper-for-toread/run-sync?token=BwR8gDfPP87djAARwZTbQtmGA',
        data: {
          url,
          width: 1024,
          height: 748,
        },
        config: {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      }).then(response => {
        pageInfo = { url, ...response.data }
      })

      commit('ADD_LIST_ITEM', pageInfo)
    },
  },

  // Mutations
  mutations: {
    ADD_LIST_ITEM(state, item) {
      state.toReadList.push(item)
    },
  },
})
