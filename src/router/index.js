import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from '../store/index.js'
import api from '../api/index.js'
import { Toast } from 'vant'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async (to, from, next) => {
  let arr = ['/person', '/store', '/updateperson']
  if (arr.includes(to.path)) {
    let isLogin = store.state.isLogin
    //检查是否登录
    if (isLogin) {
      next()
      return
    }
    if (isLogin === false) {
      Toast("未登录，请先登录")
      next('/login')
      return
    }
    if (isLogin === null) {
      try {
        let { code, data } = await api.checkLogin()
        if (+code !== 0) {
          Toast("未登录，请先登录")
          next('/login')
          return
        }
        store.commit('changeInfo',data)
        next()
      } catch (err) {
        console.log(err)
      }
      return
    }
  }
  next()
})
export default router