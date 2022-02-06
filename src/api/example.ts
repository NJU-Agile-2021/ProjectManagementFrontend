import { Result } from '#/axios'
import { mockHttp } from '@/utils/http'

export function exampleApiGet() {
  return mockHttp.get<Result<string>>({ url: '/api' })
}
