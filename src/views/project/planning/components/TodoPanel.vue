<template>
  <div class="w-80">
    <div class="mb-2 flex gap-2 justify-between items-center">
      <div class="font-semibold text-primary text-[1rem]" v-if="!isEditingTaskListTitle">{{
        taskList.name
      }}</div>

      <el-input
        v-else
        ref="target"
        size="small"
        v-model="taskListTitle"
        @keyup.enter="changeTaskListTitle"
      />

      <el-dropdown trigger="click" @command="handleCommand">
        <div class="p-1 text-secondary cursor-pointer hover:text-brand">
          <el-icon><more /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="edit">编辑任务列表标题</el-dropdown-item>
            <el-dropdown-item command="del">
              <div class="text-$el-color-danger">删除任务列表</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-button plain :icon="Plus" class="w-full" @click="open" />
    <todo-item
      class="mt-2 w-full block"
      v-for="item in taskList.tasks"
      :key="item.id"
      :task="item"
    />
  </div>
</template>

<script lang="ts" setup>
import { TaskListVO } from '@/api/models'
import { createTask, deleteTaskList, updateTaskListName } from '@/api/task'
import { useDeleteData } from '@/composable'
import { useProjectStore, useUserStore } from '@/store'
import { Plus, More } from '@element-plus/icons-vue'
import { onClickOutside } from '@vueuse/core'
import { ElMessageBox, ElMessage } from 'element-plus'
import TodoItem from './TodoItem.vue'

const props = defineProps<{ taskList: TaskListVO }>()

const emits = defineEmits(['add:task', 'delete:task', 'update:taskListTitle', 'delete:taskList'])

const projectStore = useProjectStore()
const userStore = useUserStore()
const open = () => {
  ElMessageBox.prompt('输入任务名称', '新建任务', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(async ({ value }) => {
    const { success, message } = await createTask({
      projectId: projectStore.id,
      userId: userStore.userId,
      title: value,
      taskListId: props.taskList.id,
    })
    if (success) {
      emits('add:task')
      ElMessage({
        type: 'success',
        message: `新建任务成功：${value}`,
      })
    } else {
      ElMessage.error({ message })
    }
  })
}

const handleCommand = (command: string | number | object) => {
  if (command == 'edit') {
    taskListTitle.value = props.taskList.name
    isEditingTaskListTitle.value = true
  } else if (command == 'del') {
    handleDelete(props.taskList.id)
  }
}

const target = ref(null)
onClickOutside(target, () => (isEditingTaskListTitle.value = false))
const isEditingTaskListTitle = ref(false)
const taskListTitle = ref(props.taskList.name)
watch(
  () => props.taskList.name,
  (name, _prev) => {
    if (!isEditingTaskListTitle.value) {
      taskListTitle.value = name
    }
  }
)
const changeTaskListTitle = async () => {
  const { success, message } = await updateTaskListName(props.taskList.id, taskListTitle.value)
  if (success) {
    isEditingTaskListTitle.value = false
    emits('update:taskListTitle', taskListTitle.value)
  } else {
    ElMessage.error({ message })
  }
}

const { handleDelete } = useDeleteData(deleteTaskList)(async () => emits('delete:taskList'))
</script>
