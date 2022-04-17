<template>
  <div
    class="flex items-center gap-2 text-secondary w-full h-$height-nav-project bg-white border-b"
  >
    <el-tooltip content="返回首页" placement="bottom" effect="light">
      <router-link to="/home">
        <el-icon class="cursor-pointer ml-2 hover:text-primary"><arrow-left-bold /></el-icon>
      </router-link>
    </el-tooltip>
    <img
      src="https://tcs-ga.teambition.net/thumbnail/111we05ea9278369490aa75df3bb8095a02a/w/600/h/300"
      class="h-12 w-12 rounded-2xl"
    />
    <section class="flex-1 h-full flex flex-col place-content-between ml-5">
      <div class="flex gap-2 items-center mt-auto -mb-1">
        <div class="font-semibold text-xl text-primary w-20 truncate">{{
          projectStore.info?.name
        }}</div>
        <el-tooltip content="项目信息" placement="bottom" effect="light">
          <el-dropdown trigger="click">
            <div
              class="w-7 h-7 cursor-pointer ml-2 rounded-md flex items-center justify-center text-secondary hover:(text-regular bg-light-500)"
            >
              <el-icon :size="20"><info-filled /></el-icon>
            </div>
            <template #dropdown>
              <div class="p-5 flex flex-col gap-5 w-60 items-start relative">
                <template v-if="!isEditingProjectTitle">
                  <el-alert type="info" :closable="false" :title="projectStore.info?.name">
                    <div
                      class="absolute top-1/2 right-5 transform -translate-y-1/2 p-1 cursor-pointer"
                      @click="isEditingProjectTitle = true"
                    >
                      <el-icon title="编辑标题"><edit /></el-icon> </div
                  ></el-alert>
                </template>
                <el-input v-else v-model="projectTitle" @keyup.enter="changeTitle" />
                <el-alert type="info" :closable="false" title="项目描述">
                  <div>{{ projectStore.info?.description }}</div>
                </el-alert>
                <el-button type="text" :icon="Reading" @click="announcementsDialogVisible = true"
                  >项目公告</el-button
                >
                <project-announcement v-model:visible="announcementsDialogVisible" />
              </div>
            </template>
          </el-dropdown>
        </el-tooltip>
      </div>
      <el-tabs class="project-tabs" v-model="currentTab" @tab-click="handleTabsClick">
        <el-tab-pane label="项目规划" name="Planning" />
        <el-tab-pane label="项目统计" name="Statistics" />
      </el-tabs>
    </section>
    <section class="justify-self-end flex items-center gap-2" v-loading="loading">
      <div>
        <el-tooltip
          :content="m.name"
          placement="bottom"
          effect="light"
          v-for="m in members"
          :key="m.userId"
        >
          <el-avatar
            class="cursor-pointer border border-white -ml-1"
            :size="32"
            @click="membersDrawerVisible = true"
            >{{ m.name.substring(0, 4) }}</el-avatar
          >
        </el-tooltip>
      </div>
      <el-button type="primary" plain size="small" @click="membersDrawerVisible = true"
        >邀请</el-button
      >
    </section>
    <el-divider direction="vertical" />
    <div class="justify-self-end mr-5">
      <el-button plain size="small" :icon="Operation">菜单</el-button>
    </div>
  </div>
  <members-detail v-model:visible="membersDrawerVisible" @update-members="handleInviteMember" />
  <el-main><router-view /></el-main>
</template>

<script lang="ts" setup>
import { getProjectMembersApi, inviteUserApi } from '@/api/project'
import { useDeleteData, useTableData } from '@/composable'
import { useProjectStore } from '@/store'
import { ArrowLeftBold, Operation, InfoFilled, Reading, Edit } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import MembersDetail from './components/MembersDetail.vue'
import ProjectAnnouncement from './components/ProjectAnnouncement.vue'

const projectStore = useProjectStore()
const fetchProjectMember = () => getProjectMembersApi(projectStore.info?.id ?? 0)
const {
  loading,
  data: members,
  fetchData,
} = useTableData(fetchProjectMember, { onMounted: true })()
watchEffect(() => {
  projectStore.setMembers(members.value)
})
const currentTab = ref('Planning')
const router = useRouter()
watchEffect(() => {
  currentTab.value = String(router.currentRoute.value.name)
})
const handleTabsClick = (tab: unknown) => {
  const to = (tab as { paneName: string }).paneName
  router.push({ name: to, query: router.currentRoute.value.query })
}

// ================== 邀请成员 =========================
const membersDrawerVisible = ref(false)
const inviteMemberApi = (userId: number) =>
  inviteUserApi({
    userId,
    projectId: projectStore.info?.id ?? 0,
    role: 1,
  })
const { handleDelete: inviteUser } = useDeleteData(inviteMemberApi, { messagePrefix: '添加成员' })(
  fetchData
)
const handleInviteMember = (userId: number) => {
  inviteUser(userId)
}

// ================== 项目公告 =========================
const isEditingProjectTitle = ref(false)
const projectTitle = ref(projectStore.info?.name || '')
watch(
  () => projectStore.info?.name,
  (name, _prevName) => {
    if (!isEditingProjectTitle) {
      projectTitle.value = name || ''
    }
  }
)
const changeTitle = () => {
  projectStore.setTitle(projectTitle.value)
  isEditingProjectTitle.value = false
}

const announcementsDialogVisible = ref(false)
</script>
<style scoped>
.project-tabs:deep() .el-tabs__header.is-top {
  margin-bottom: 0;
}
</style>
