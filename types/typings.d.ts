import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 路由名称
    title: string
    // 是否需要验证，默认不需要
    requiresAuth?: boolean
    // 现在展开的标题
    currentActiveMenu?: string
  }
}
