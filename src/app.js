import Vue from 'vue'
import App from './components/App'
import store from './store'
import './main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquare as faSquareS } from '@fortawesome/free-solid-svg-icons'
import { faSquare as faSquareR } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSquareS, faSquareR)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
