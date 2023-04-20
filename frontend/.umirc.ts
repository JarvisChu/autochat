import { defineConfig } from 'umi';

export default defineConfig({
  title: 'ChatGPT',
  favicon: '/assets/favicon.ico',
  history:{
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/login/index' },
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          exact: true,
          path: '/chat',
          component: '@/pages/chat/index'
        }
      ]
    }
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      pathRewrite: { '^/api': '/' },
      changeOrigin: true,
    }
  }
});
