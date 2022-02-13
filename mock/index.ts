import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
import { buildSuccess } from './utils'
const projects = new Array(20).fill(null).map(() => ({
  id: Random.increment(),
  name: Random.ctitle(),
  description: Random.csentence(),
}))
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
  {
    url: '/mock/api/project/getProjectList',
    method: 'get',
    response: () => buildSuccess(projects),
  },
  {
    url: '/mock/api/project/createProject',
    method: 'post',
    response: () => buildSuccess(Random.pick(projects)),
  },
] as MockMethod[]
