import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import actions from './actions'

const store = new Vuex.Store({
  state: {
    locaScreen: true,
    timeRecords: [],
    opened: true,
    device: 'desktop',
  },
  getters: {
    getStorage (state) {
      if (!state.userinfo) {
        state.userinfo = JSON.parse(localStorage.getItem('userinfo'))
      }
      return state.userinfo
    }
  },
  mutations: {
    USERINFO (state, data) {
      state.userinfo = data
    },
    toggleState (state) {
      state.opened = !state.opened
    },
    toggleDevice(state,data){
      state.device = data
    },
    closeSideBar(state,data){
      state.opened = false
    }
  },
  actions
})
export default store
