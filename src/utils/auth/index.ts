import { TOKEN_KEY } from '@/enums/cacheEnum'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
