import { createStore,createLogger } from 'vuex'
import api from '@/api/index.js'
const env=process.env.NODE_ENV
export default createStore({
  state: {
    isLogin:null,
    info:null,
  },
  getters: {
  },
  mutations: {
    changeisLogin(state,bool){
      state.isLogin=bool
    },
    changeInfo(state,payload){
      state.info=payload
    }
  },
  actions: {
    async changeisLoginAsync({commit}){
      let bool=false
      let {code}=await api.checkLogin()
      if(+code===0){bool=true}
      commit('changeisLogin',bool)
    },
    async changeInfoAsync({commit}){
      let {code,data}=await api.userInfo()
      if(+code===0){
        commit('changeInfo',data)
      }
    }
  },
  modules: {
  },
  plugins:env==='production'?[]:[createLogger()]
})
