import Layout from '@/views/Layout.vue'
import { RouteRecordRaw } from 'vue-router'
import { loginRegisterRouter, pageNotFoundRoute } from './basic'
const appRoute: RouteRecordRaw = {
  path: '/',
  name: 'Layout',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: '/home',
      name: 'Home',
      meta: {
        title: '首页',
      },
      component: () => import('@/views/Home.vue'),
    },
  ],
}
export const basicRoutes = [pageNotFoundRoute, ...loginRegisterRouter, appRoute]
