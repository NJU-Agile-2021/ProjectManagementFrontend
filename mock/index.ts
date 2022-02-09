import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
import { buildSuccess } from './utils'

export default [
  {
    url: '/mock/api/user/login',
    method: 'post',
    response: () =>
      buildSuccess({
        name: Random.cname(),
        email: Random.email(),
        id: Random.natural(),
      }),
  },
  {
    url: '/mock/api/user/register',
    method: 'post',
    response: () =>
      buildSuccess({
        name: Random.cname(),
        email: Random.email(),
        id: Random.natural(),
      }),
  },
] as MockMethod[]
