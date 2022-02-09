import { useUserStoreWithOut } from '@/store'
import { AxiosCanceler } from '@/utils/http/axiosCancel'
import type { LocationQueryRaw, Router } from 'vue-router'
import { LOGIN_NAME } from '../constant'

export function setupRouterGuard(router: Router) {
  createHttpGuard(router)
  createAuthGuard(router)
}

/**
 * The interface used to close the current page to complete the request when the route is switched
 * https://github.com/anncwb/vue-vben-admin/blob/74b0dfd54f/src/router/guard/index.ts
 * @param router
 */
function createHttpGuard(router: Router) {
  const removeAllHttpPending = true
  let axiosCanceler: Nullable<AxiosCanceler>
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler()
  }
  router.beforeEach(async () => {
    // Switching the route will delete the previous request
    axiosCanceler?.removeAllPending()
    return true
  })
}

function createAuthGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  router.beforeEach((to) => {
    if (!userStore.isLogin && to.name !== LOGIN_NAME) {
      console.warn('[Redirect]未登录')
      return {
        name: LOGIN_NAME,
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      }
    }
  })
}
