import Vue from 'vue'
import Vuex from 'vuex'
import listTest from '../../tests/listTest'

Vue.use(Vuex)

export default new Vuex.Store({
  // State
  state: {
    toReadList: [],
  },

  // Getters
  getters: {
    getFilteredToReadList: state => (search = ' ') => {
      return state.toReadList.filter(
        item => item.author.toLowerCase().indexOf(search.toLowerCase()) === 0,
      )
    },
  },

  // Actions
  actions: {
    initList({ commit }) {
      commit('INIT_LIST', listTest())
    },
  },

  // Mutations
  mutations: {
    INIT_LIST(state, list) {
      state.toReadList = list
    },
    ADD_LIST_ITEM(state, item) {},
    REMOVE_LIST_ITEM(state, item) {},
  },
})
