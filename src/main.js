import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from './router/routes'
import { scrollAnimate } from './directives/scrollAnimate'
import './assets/styles/_global.scss'

// vite-ssg 内置 @unhead/vue 支持，useHead() 在组件中开箱即用
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: '/',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      return { top: 0, behavior: 'smooth' }
    },
  },
  ({ app }) => {
    // 指令已实现 getSSRProps，SSR 和客户端均可注册
    app.directive('scroll-animate', scrollAnimate)
  }
)
