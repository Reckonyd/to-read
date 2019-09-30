import listTest from '../../../tests/listTest'

// State
const state = {
  list: [],
}

// Mutations
const mutations = {
  INIT_LIST(state, list) {
    state.list = list
  },
  ADD_ITEM(state) {},
  REMOVE_ITEM(state) {},
}

// Actions
const actions = {
  initList({ commit }) {
    commit('INIT_LIST', listTest())
  },
}

// Getters
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}
