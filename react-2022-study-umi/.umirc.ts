import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: '@/pages/index',
        },
        {
          path: '/list/:tab?/:page?',
          component: '@/pages/list',
          wrappers: ['@/wrappers/ListType','@/wrappers/auth']
        },
        {
          path: '/about',
          component: '@/pages/About',
        },
        {
          path: '/getstart',
          component: '@/pages/Getstart',
        },
        {
          path: '/login',
          component: '@/pages/login',
        },
        { component: '@/pages/404' },
      ],
    },
        { path: '/404',component: '@/pages/404' },
  ],
  fastRefresh: {},
  theme: {
    '@primary-color': '#1da57a',
  },
});
