import { createStore,createLogger } from 'vuex'
const env=process.env.NODE_ENV
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins:env==='production'?[]:[createLogger()]
})
