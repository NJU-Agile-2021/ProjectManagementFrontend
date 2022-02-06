import { AxiosCanceler } from '@/utils/http/axiosCancel'
import type { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  createHttpGuard(router)
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
