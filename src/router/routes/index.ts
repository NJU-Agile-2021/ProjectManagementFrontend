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
    {
      path: '/project',
      name: 'Project',
      component: () => import('@/views/project/Detail.vue'),
      redirect: '/project/planning',
      meta: {
        title: '项目详情',
        currentActiveMenu: '/home',
      },
      children: [
        {
          path: 'planning',
          name: 'Planning',
          meta: {
            title: '项目规划',
          },
          component: () => import('@/views/project/planning/Todo.vue'),
        },
        {
          path: 'todo-item',
          name: 'TodoItem',
          meta: {
            title: '任务详情',
          },
          component: () => import('@/views/project/planning/TodoDetail.vue'),
        },
        {
          path: 'statistics',
          name: 'Statistics',
          meta: {
            title: '项目统计',
          },
          component: () => import('@/views/project/statistics/Statistics.vue'),
        },
      ],
    },
  ],
}
export const basicRoutes = [pageNotFoundRoute, ...loginRegisterRouter, appRoute]
