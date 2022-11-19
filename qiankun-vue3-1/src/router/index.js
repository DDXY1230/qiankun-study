import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/notebook_1',
    name: 'notebook_1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/notebook_1.vue')
  },
  {
    path: '/notebook_2',
    name: 'notebook_2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/notebook_2.vue')
  }
]

const router = createRouter({
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? "/micro-app4":process.env.BASE_URL),
  routes
})

export default router
