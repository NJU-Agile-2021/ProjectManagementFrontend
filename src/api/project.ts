import { useUserStoreWithOut } from '@/store'
import { defHttp as request } from '@/utils/http'
const userStore = useUserStoreWithOut()

export interface ProjectBaseInfo {
  id: number
  name: string
  description: string
}

export interface ProjectParam {
  name: string
  description: string
}

export function createDefaultProjectParam(): ProjectParam {
  return {
    name: '',
    description: '',
  }
}

export function getProjectListApi() {
  return request.get<ProjectBaseInfo[]>({
    url: '/api/project/getProjectList',
    params: { userId: userStore.userId },
  })
}

export function createProjectApi(form: ProjectParam) {
  return request.post<ProjectBaseInfo>({
    url: '/api/project/createProject',
    data: { userId: userStore.userId, ...form },
  })
}
