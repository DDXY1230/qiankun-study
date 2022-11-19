import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import style1 from '../views/style1'
import style2 from '../views/style2'
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
  },
  {
    path: '/notebook_3',
    name: 'notebook_3',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/notebook_3.vue')
  },
  {
    path: '/notebook_4',
    name: 'notebook_4',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/notebook_4.vue'),
    children: [
      {
        path: 'style1',
        component: style1
      },
      {
        path: 'style2',
        component: style2
      }
    ]
  },

  // 用正则限制动态路由的方式
  // path: '/news/:id(\\d+)' 要求输入的地址必须式数字如/news/234、/news/11
  // 如果不符合,如/news/213aa 则会跳到NotFound页面
  // 多个参数 path:'/news/:id+'  后面的 + 表示有多个参数
  // 参数可有可无 path: '/news/:id*'  后面的 * 表示id可有可无
  // 还有一个方式也可以表示参数可有可无 path: '/news/:id?'
  // 但是问号 ? 不可以进行重复叠加

  // 上面的都没有匹配到,
  {
    path: '/:path(.*)*',
    name: 'NotFound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? "/micro-app4":process.env.BASE_URL),
  routes
})

export default router
