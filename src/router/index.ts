import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes'

// app router
export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
