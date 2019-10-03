import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import cheerio from 'cheerio'

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
    addItem({ commit }, url) {
      axios
        .get(`https://cors-anywhere.herokuapp.com/${url}`)
        .then(response => {
          const $ = cheerio.load(response.data)

          const extractMeta = property =>
            $(`meta[property=${property}]`).attr('content') ||
            $(`meta[property="og:${property}"]`).attr('content') ||
            $(`meta[property="twitter:${property}"]`).attr('content')

          const readInfo = {
            id: this.state.listCount++,
            url,
            title: $('title')
              .first()
              .text(),
            description: extractMeta('description'),
            image: `https://api.apiflash.com/v1/urltoimage?access_key=${process.env.API_KEY}&url=${url}&width=1024&height=500`,
          }

          commit('ADD_LIST_ITEM', readInfo)
        })
        .catch(err => console.log(err))
    },
  },

  // Mutations
  mutations: {
    ADD_LIST_ITEM(state, item) {
      state.toReadList.push(item)
    },
  },
})
