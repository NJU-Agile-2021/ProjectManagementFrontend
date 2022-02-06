import { useTitle } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export function usePageTitle() {
  const route = useRoute()
  const title = computed(() => (route.meta?.title ?? import.meta.env.VITE_APP_TITLE) as string)
  useTitle(title)
  return title
}
export interface UseFetchOption {
  onMounted?: boolean
  messagePrefix?: string
}
export * from './table'
export * from './fetch'
