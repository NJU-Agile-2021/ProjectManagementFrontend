import { MockMethod } from 'vite-plugin-mock'
import { buildSuccess } from './utils'

export default [
  {
    url: '/mock/api',
    method: 'get',
    response: () => buildSuccess('API Text'),
  },
  {
    url: '/upload',
    method: 'post',
    response: ({ body, query }) => {
      console.log('>>>>>>>BODY:', body)
      console.log('>>>>>>>QUERY:', query)
      return buildSuccess(null, 'ok')
    },
  },
] as MockMethod[]
