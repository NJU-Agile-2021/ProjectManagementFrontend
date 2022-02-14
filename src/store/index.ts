import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useProjectStore from './modules/project'

const store = createPinia()

export { useAppStore, useUserStore, useProjectStore }
// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
export default store
