<template>
  <div class="p-5">
    <h1 class="mt-0">我的项目</h1>
    <el-skeleton :loading="loading">
      <template #default>
        <el-space wrap size="large">
          <el-card
            :body-style="{ padding: 0 }"
            v-for="item in data"
            :key="item.id"
            shadow="hover"
            class="project-card"
            @click="openProject(item)"
          >
            <img
              src="https://tcs-ga.teambition.net/thumbnail/111we05ea9278369490aa75df3bb8095a02a/w/600/h/300"
              class="h-24 w-48"
            />
            <div class="p-3 w-48">
              <h3 class="m-0">{{ item.name }}</h3>
              <p class="truncate m-0 mt-2 text-secondary text-sm">{{ item.description }}</p>
            </div>
          </el-card>
          <el-card
            :body-style="{ padding: 0 }"
            @click="createProjectDialogVisible = true"
            shadow="hover"
            class="project-card hover:text-brand"
          >
            <div class="bg-light-500 flex flex-col justify-between p-3 h-44">
              <el-icon :size="20"><plus /></el-icon>
              <h3 class="m-0">创建项目</h3>
            </div>
          </el-card>
        </el-space>
      </template>
      <template #template>
        <div class="w-48 space-y-2">
          <el-skeleton-item variant="image" style="width: 12rem; height: 6rem" />
          <div class="px-2"><el-skeleton-item variant="text" /></div>
          <div class="px-2"><el-skeleton-item variant="text" /></div>
        </div>
      </template>
    </el-skeleton>
    <el-dialog v-model="createProjectDialogVisible" title="创建项目">
      <el-form
        :model="createProjectFormData"
        ref="createProjectForm"
        :rules="createProjectFormRules"
        :label-width="formLabelWidth"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="createProjectFormData.name" placeholder="项目名称" />
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input
            type="textarea"
            :rows="5"
            v-model="createProjectFormData.description"
            placeholder="项目描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="hstack justify-end">
          <el-button plain @click="createProjectDialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitCreateProjectForm"
            :loading="createProjectButtonLoading"
            >确定</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  createDefaultProjectParam,
  createProjectApi,
  getProjectListApi,
  ProjectBaseInfo,
} from '@/api/project'
import { createRule } from '@/components/forms'
import { useTableData } from '@/composable'
import { useProjectStore } from '@/store'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const { loading, fetchData, data } = useTableData(getProjectListApi, { onMounted: true })()
const router = useRouter()
const projectStore = useProjectStore()
const openProject = (p: ProjectBaseInfo) => {
  router.push({ path: '/project', query: { name: p.name, id: p.id } })
  projectStore.setInfo(p)
}
// ========================= 创建项目表单 =======================================
const formLabelWidth = ref('120px')
const createProjectForm = ref()
const createProjectDialogVisible = ref(false)
const createProjectButtonLoading = ref(false)
const createProjectFormData = ref(createDefaultProjectParam())
const createProjectFormRules = ref({
  name: createRule('项目名称不能为空'),
})
const submitCreateProjectForm = async () => {
  await createProjectForm.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        createProjectButtonLoading.value = true
        const success = await createProjectApi(createProjectFormData.value)
        if (!success) {
          ElMessage.error({ message: '创建项目失败' })
        } else {
          ElMessage.success({ message: '创建成功' })
          fetchData()
        }
      } catch (error) {
        console.log(error)
        ElMessage.error({ message: '创建项目失败' })
      } finally {
        createProjectButtonLoading.value = false
        createProjectDialogVisible.value = false
      }
    }
  })
}
</script>
<style lang="scss" scoped>
.project-card {
  --el-card-border-radius: 16px;
  @apply cursor-pointer w-48 h-44;
  &:hover {
    transform: translateY(-8px);
  }
}
</style>
