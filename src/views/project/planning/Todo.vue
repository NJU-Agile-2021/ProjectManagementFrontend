<template>
  <div
    class="flex gap-5 items-start"
    style="height: calc(100vh - var(--height-nav-project) - 2 * var(--el-main-padding))"
  >
    <todo-panel
      v-for="item in data"
      :key="item.id"
      :task-list="item"
      @add:task="fetchData"
      @update:task-list-title="(title) => (item.name = title)"
      @delete:task-list="fetchData"
    />
    <div
      class="w-80 text-secondary flex items-center cursor-pointer hover:(text-brand)"
      @click="open"
    >
      <el-icon class="mr-2"><circle-plus-filled /></el-icon>
      新建任务列表
    </div>
  </div>
</template>
<script lang="ts" setup>
import { createTaskList, getTaskLists } from '@/api/task'
import { useTableData } from '@/composable'
import { useProjectStore } from '@/store'
import { CirclePlusFilled } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import TodoPanel from './components/TodoPanel.vue'

const projectStore = useProjectStore()
const { data, fetchData } = useTableData(() => getTaskLists(projectStore.id), { onMounted: true })()

const open = () => {
  ElMessageBox.prompt('输入任务列表名称', '新建任务列表', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(async ({ value }) => {
    const { success, message } = await createTaskList(projectStore.info?.id as number, value)
    if (success) {
      fetchData()
      ElMessage({
        type: 'success',
        message: `新建任务列表成功：${value}`,
      })
    } else {
      ElMessage.error({ message })
    }
  })
}
</script>
