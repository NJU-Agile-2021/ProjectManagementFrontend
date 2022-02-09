import { RouteRecordRaw } from 'vue-router'
import { EXCEPTION_COMPONENT, LOGIN_NAME, PAGE_NOT_FOUND_NAME } from '../constant'

/**
 * 404页面
 */
export const pageNotFoundRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  meta: {
    title: '404-您访问的页面不存在',
  },
  component: EXCEPTION_COMPONENT,
}
/**
 * 登录注册
 */
export const loginRegisterRouter: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: LOGIN_NAME,
    meta: {
      title: '登录',
    },
    component: () => import('@/views/login/Login.vue'),
  },
]
