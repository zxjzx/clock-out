import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import actions from './actions';

const store = new Vuex.Store({
  state:{
    locaScreen:true,
    timeRecords:[],
  },
  getters:{
    getStorage(state){
      if(!state.userinfo){
        state.userinfo = JSON.parse(localStorage.getItem('userinfo'))
      }
      return state.userinfo
    }
  },
  mutations:{
    USERINFO(state,data){
      console.log(state)
      console.log(data)
      state.userinfo = data;
    }
  },
  actions
})
export default store
