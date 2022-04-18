import { ProjectBaseInfo, ProjectMember } from '@/api/project'
import { storage } from '@/utils/storage'
import { defineStore } from 'pinia'
import { ProjectState } from './types'
const ProjectStorageKey = 'PROJECT_INFO__KEY'

const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    baseInfo: null,
    members: [],
  }),
  getters: {
    info(): Nullable<ProjectBaseInfo> {
      return this.baseInfo || JSON.parse(storage.getItem(ProjectStorageKey) ?? '{}')
    },
    id(): number {
      return this.info?.id ?? 1
    },
  },
  actions: {
    setInfo(info: ProjectBaseInfo) {
      this.baseInfo = info
      storage.setItem(ProjectStorageKey, JSON.stringify(info))
    },
    setTitle(title: string) {
      if (this.baseInfo) {
        this.baseInfo.name = title
      }
    },
    setMembers(members: ProjectMember[]) {
      this.members = members
    },
  },
})

export default useProjectStore
