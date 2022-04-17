<template>
  <el-dialog
    custom-class="h-[75vh]"
    :model-value="visible"
    :close-on-click-modal="false"
    :modal="false"
    :append-to-body="true"
    @update:model-value="(value) => emits('update:visible', value)"
    title="项目公告"
  >
    <div class="flex flex-col gap-5">
      <div class="-mt-5 mb-5">
        <el-button type="primary" class="w-full" :icon="Plus" @click="open">添加公告</el-button>
      </div>

      <el-skeleton :loading="loading">
        <template #default>
          <div class="space-y-5 flex-1 overflow-auto">
            <el-alert
              type="info"
              :closable="false"
              v-for="item in announcements"
              :key="item.id"
              :title="item.createTime"
            >
              <div>{{ item.content }}</div>
              <el-popconfirm
                title="你确定要删除吗？删除后不可恢复！"
                icon-color="red"
                :icon="WarningFilled"
                @confirm="handleDelete(item.id)"
              >
                <template #reference>
                  <div
                    class="absolute top-1/2 right-5 transform -translate-y-1/2 p-1 cursor-pointer"
                  >
                    <el-icon color="var(--el-color-danger)"><delete /></el-icon>
                  </div>
                </template>
              </el-popconfirm>
            </el-alert>
          </div>
        </template>
        <template #template>
          <div class="w-48 space-y-2">
            <div class="px-2"><el-skeleton-item variant="text" /></div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { createAnnouncement, deleteAnnouncement, getAnnouncementList } from '@/api/project'
import { useDeleteData, useTableData } from '@/composable'
import { useProjectStore } from '@/store'
import { Plus, Delete, WarningFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps<{ visible: boolean }>()
const { visible } = toRefs(props)
const emits = defineEmits(['update:visible'])
const projectStore = useProjectStore()
const {
  loading,
  data: announcements,
  fetchData,
} = useTableData(() => getAnnouncementList(projectStore.info?.id as number), { onMounted: true })()

const open = () => {
  ElMessageBox.prompt('请输入公告内容', '发布公告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(async ({ value }) => {
      await createAnnouncement({
        id: -1,
        content: value,
        projectId: projectStore.info?.id as number,
      })
      fetchData()
      ElMessage({
        type: 'success',
        message: `发布公告成功：${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消发布',
      })
    })
}

const { handleDelete } = useDeleteData(deleteAnnouncement)(fetchData)
</script>
