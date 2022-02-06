import Home from '@/views/Home.vue'
import { RouteRecordRaw } from 'vue-router'
import { loginRegisterRouter, pageNotFoundRoute } from './basic'
const appRoute: RouteRecordRaw = {
  path: '/',
  meta: {
    title: '首页',
  },
  component: Home,
}
export const basicRoutes = [pageNotFoundRoute, ...loginRegisterRouter, appRoute]
