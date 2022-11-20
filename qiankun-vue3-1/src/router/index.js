import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import style1 from '../views/style1'
import style2 from '../views/style2'
import leftSider from '../views/leftSider'
import rightSider from '../views/rightSider'
const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/notebook_1',
    // alias: '/mynote',//起别名,多个名字用数组的形式
    alias: ['/mynote', '/note'],
    name: 'notebook_1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/notebook_1.vue')
  },
  {
    path: '/notebook_2',
    name: 'notebook_2',
    beforeEnter: (to, from, next) => {
      // 只有进入notebook_2的时候触发,专门的路由守卫
      console.log('noteboo2=>to', to)
      console.log('noteboo2=>from', from)
      // alert('该路由暂时未开放')
      // next(false)
      next()
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/notebook_2.vue')
  },
  {
    path: '/notebook_3',
    name: 'notebook_3',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/notebook_3.vue')
  },
  {
    path: '/notebook_4',
    name: 'notebook_4',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/notebook_4.vue'),
    children: [{
        path: 'style1/:id',
        props: {
          default: true,
          leftSider: true,
          rightSider: false
        }, // 控制一下路由是否可以获取到参数
        components: {
          default: style1,
          leftSider: leftSider,
          rightSider: rightSider
        }
      },
      {
        path: 'style2/:id',
        props: true, // 开启路由传参
        component: style2
      }
    ]
  },
  {
    path: '/notebook_5',
    name: 'notebook_5',
    component: () => import( /* webpackChunkName: "about" */ '../views/notebook_5.vue'),

  },
  {
    path: '/home',
    // redirect: '/' // 重定向
    // redirect: {name: 'home'} // 也可以用路由名字
    redirect: (to) => {
      console.log(to) // 这个地方主要是做一些路由截拦等,验证是否有权限等等功能
      return {
        path: '/'
      }
    }
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
    component: () => import( /* webpackChunkName: "about" */ '../views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? "/micro-app4" : process.env.BASE_URL),
  // history: createWebHashHistory(window.__POWERED_BY_QIANKUN__ ? "/micro-app4":process.env.BASE_URL),
  routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  // 这里处理一些权限逻辑
  console.log("🚀 ~ file: index.js ~ line 96 ~ router.beforeEach ~ to", to)
  console.log("🚀 ~ file: index.js ~ line 97 ~ router.beforeEach ~ from", from)
  next(true) // 通行证 不传或者传true都是通行,传false表示禁止通行
})
// 第三个参数一旦写了就要调用,否则不会跳转页面
export default router