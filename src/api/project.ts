import { Result } from '#/axios'
import { useUserStoreWithOut } from '@/store'
import { defHttp, defHttp as request, rawResultHttp } from '@/utils/http'
import { ProjectUrlEnum } from './apiUrl'
import { AnnouncementForm, AnnouncementVO } from './models'
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
export interface ProjectMemberForm {
  projectId: number
  userId: number
  role: number //0为普通用户，1为管理员,2为创建者
}
export interface ProjectMember extends ProjectMemberForm {
  name: string
  relationshipId: number
}

export function getProjectMembersApi(projectId: number) {
  return request.get<ProjectMember[]>({
    url: '/api/project/getProjectMembers',
    params: { projectId },
  })
}

export function inviteUserApi(data: ProjectMemberForm) {
  return rawResultHttp.post<Result<boolean>>({
    url: '/api/project/addProjectMember',
    data,
  })
}

export function createAnnouncement(data: AnnouncementForm) {
  return rawResultHttp.post<Result<boolean>>({
    url: ProjectUrlEnum.CREATE_ANNOUNCEMENT,
    data,
  })
}

export function updateAnnouncement(data: AnnouncementForm) {
  return rawResultHttp.post<Result<boolean>>({
    url: ProjectUrlEnum.UPDATE_ANNOUNCEMENT,
    data,
  })
}

export function deleteAnnouncement(announcementId: number) {
  return rawResultHttp.get<Result<boolean>>({
    url: ProjectUrlEnum.DELETE_ANNOUNCEMENT,
    params: { announcementId },
  })
}

export function getAnnouncementList(projectId: number) {
  return defHttp.get<AnnouncementVO[]>({
    url: ProjectUrlEnum.GET_ANNOUNCEMENTS,
    params: { projectId },
  })
}
