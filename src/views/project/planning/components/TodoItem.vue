<template>
  <router-link to="todo-item">
    <el-card :body-style="{ padding: '8px 14px', display: 'flex', gap: '14px' }">
      <el-switch v-model="hasDone" :loading="loading" :before-change="changeTaskStatus" />
      <div class="flex-1 self-center">{{ task.title }}</div>
      <el-avatar class="justify-self-end" :size="32">{{ task.createUserId }}</el-avatar>
    </el-card>
  </router-link>
</template>

<script lang="ts" setup>
import { TaskVO } from '@/api/models'
import { checkTask } from '@/api/task'
import { ElMessage } from 'element-plus'

const props = defineProps<{ task: TaskVO }>()

const hasDone = ref(props.task.state > 0)
const loading = ref(false)
const changeTaskStatus = async () => {
  loading.value = true
  try {
    const { success, message, content } = await checkTask(props.task.id)
    if (success) {
      return content
    } else {
      ElMessage.error({ message })
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  } finally {
    loading.value = false
  }
}
</script>
