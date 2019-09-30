import Vue from 'vue'
import Vuex from 'vuex'
import toReadList from './state/toReadList'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    toReadList,
  },
})
