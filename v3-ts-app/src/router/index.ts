import { getRouter } from './../http/api';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/order',
        name: 'order',
        meta: {
          isShow: true,
          title: '订单列表'
        },
        component: () => import(/* webpackChunkName:"order" */ '../views/OrderView.vue')
      },
      {
        path: '/userList',
        name: 'userList',
        meta: {
          isShow: true,
          title: '用户列表'
        },
        component: () => import(/* webpackChunkName:"userList" */ '../views/UserView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName:"login" */ '../views/LoginView.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 路由拦截
router.beforeEach(async to => {
  // 如果登录,则只能进入登录页面
  const token: string | null = localStorage.getItem('token') || ''
  if (!token && to.path !== '/login') {
    return '/login'
  } else if (to.path !== '/login' && token) {
    if (router.getRoutes().length == 3) {
      // 动态添加路由
      const routerData: any = await getRouter({})
      routerData.forEach((v: any) => {
        const routerObj: RouteRecordRaw = {
          path: v.name,
          name: v.name,
          component: () => import(/* webpackChunkName: "[request]"*/ `../views/${v.path}.vue`)
        }
        router.addRoute('home', routerObj)
      })
    }else {
      router.replace(to.path)
    }
  }
})

export default router
