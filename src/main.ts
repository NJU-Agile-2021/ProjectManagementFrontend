import { createApp } from 'vue'
import App from './App.vue'
import VueGtag from 'vue-gtag'
import { router } from './router'

// register all reactivity apis (`ref`, `computed`, `watch`, etc.)
import 'vue-global-api/reactivity'
// register all lifecycle hooks (`onMounted`, `onUpdated`, `onUnmounted`, etc.)
import 'vue-global-api/lifecycle'

// import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// custom styles
import '@/assets/styles/index.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

import ElementPlus from 'element-plus'
import '@/assets/styles/element/index.scss'

import { setupRouterGuard } from '@/router/guard'
import store from './store'

createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(VueGtag, {
    config: {
      id: import.meta.env.VITE_GA,
    },
  })
  .mount('#app')
setupRouterGuard(router)
