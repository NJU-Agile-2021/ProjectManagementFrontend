import { ProjectBaseInfo, ProjectMember } from '@/api/project'

export interface ProjectState {
  baseInfo: Nullable<ProjectBaseInfo>
  members: ProjectMember[]
}
