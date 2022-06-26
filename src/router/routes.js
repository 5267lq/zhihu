import HomeView from '../views/HomeView.vue'
// 路由懒加载的目的：在webpack打包的时候实现切割打包，第一次打开app加载的内容，事先打包到主js文件中，页面一加载，只先加载和渲染这部分内容。当后期需要跳转到指定的页面，再去把指定页面的内容加载回来并渲染。
const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/detail/:id',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "other" */ '../views/DetailView.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "other" */ '../views/LoginView.vue')
  },
  {
    path: '/person',
    component: () => import(/* webpackChunkName: "other" */ '../views/PersonView.vue')
  },
  {
    path: '/store',
    component: () => import(/* webpackChunkName: "other" */ '../views/StoreView.vue')
  },
  {
    path: '/updateperson',
    component: () => import(/* webpackChunkName: "other" */ '../views/UpdatePerson.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect:'/'
  },
]

export default routes

// 首页：'/'
// 详情：'/detail'
// 个人中心：'/personal'
//     登录：'/login'
//     个人信息：'/info'
//     收藏：'/store'
//     修改个人信息：'/update'
// 首页：'/'
// 详情：'/detail'
// 登录：'/login'
// 个人信息：'/info'
// 收藏：'/store'
// 修改个人信息：'/update'