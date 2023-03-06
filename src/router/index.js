import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // 指定webpackChunkName，每个组件打包成一个js文件
  {
    path: '/itemMusic',
    name: 'itemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/itemMusic.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/User',
    name: 'User',
    // 独享路由守卫
    beforeEnter: async (to, from, next) => {
      if (store.state.isLogin || store.state.token || localStorage.getItem('token')) {
        next()
      } else {
        next('/Login')
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "User" */ '../views/User.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/Video',
    name: 'Video',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Video" */ '../views/Video.vue')
  },
  {
    path: '/Comment',
    name: 'Comment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Comment" */ '../views/Comment.vue')
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 全局路由守卫
router.beforeEach((to, from) => {
  if (to.path == '/Login' || to.path == '/Register') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})
export default router
