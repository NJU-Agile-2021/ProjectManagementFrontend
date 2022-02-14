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
  },
  actions: {
    setInfo(info: ProjectBaseInfo) {
      this.baseInfo = info
      storage.setItem(ProjectStorageKey, JSON.stringify(info))
    },
    setMembers(members: ProjectMember[]) {
      this.members = members
    },
  },
})

export default useProjectStore
