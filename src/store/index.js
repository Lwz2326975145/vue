import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:localStorage.getItem("username")||[],
    menulist :JSON.parse(localStorage.getItem('menuList'))||[]
  },
  getters: {
  },
  mutations: {
   UPDATE(state,Username){
    state.username=Username
    console.log('调用了');
    localStorage.setItem('username',Username)
   },
   GETMENULIST(state,menulist){
     state.menulist=menulist
     console.log('GETMENU');
     localStorage.setItem('menuList',Json.parse(menulist))
   }
  },
  actions: {
  },
  modules: {
  }
})
