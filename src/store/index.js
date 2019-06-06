import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import actions from './actions'

const store = new Vuex.Store({
  state: {
    locaScreen: true,
    timeRecords: [],
  },
  getters: {},
  mutations: {
    USERINFO (state, data) {
      state.userinfo = data
    },
  },
  actions
})
export default store
