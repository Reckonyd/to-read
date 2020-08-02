import { createStore } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { State } from './types'

export const store = createStore<State>({
  state: {
    search: '',
    toReadList: [],
    directories: [],
    selectedItems: [],
    draggedItemInfo: undefined,
    waiting: 0,
    failStatus: '',
  },
  getters,
  actions,
  mutations,
})
