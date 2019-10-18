import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
// import storeTest from '../../tests/storeTest'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toReadList: [],
    directories: [],
    selectedItems: [],
    waiting: 0,
  },
  getters,
  actions,
  mutations,
})
