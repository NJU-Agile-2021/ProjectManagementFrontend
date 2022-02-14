import { UserState } from '@/store/modules/user/types'
import { defHttp as request } from '@/utils/http'

export interface UserForm {
  name: string
  pwd: string
  email: string
}
export function createDefaultUserParam(): UserForm {
  return {
    name: '',
    pwd: '',
    email: '',
  }
}

export function login(data: UserForm) {
  return request.post<UserState>({ url: '/api/user/login', data })
}

export function register(data: UserForm) {
  return request.post<UserState>({ url: '/api/user/register', data })
}

export function searchUserApi(search: string) {
  return request.get<UserState[]>({
    url: '/api/user/searchUsersByNameOrEmail',
    params: { userNameOrEmail: search },
  })
}
