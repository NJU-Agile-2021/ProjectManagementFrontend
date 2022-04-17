<template>
  <el-drawer
    :model-value="visible"
    @close="emits('update:visible', false)"
    @open="emits('update:visible', true)"
    size="25%"
  >
    <template #title>
      <h4 class="text-center m-0">全部成员</h4>
    </template>
    <template #default>
      <div class="-mx-5 space-y-5">
        <div class="border-t border-color-primary -mt-5 mx-5"></div>
        <div class="px-5">
          <el-autocomplete
            v-model="searchName"
            :fetch-suggestions="querySearchAsync"
            placeholder="搜索成员，输入用户名或者邮箱"
            @select="handleSelect"
            :highlight-first-item="true"
            value-key="name"
            size="large"
            class="w-full"
          >
            <template #append>
              <el-button
                :disabled="!currentInviteUser || !searchName"
                @click="emits('updateMembers', currentInviteUser?.id ?? 0)"
                >邀请</el-button
              >
            </template>
          </el-autocomplete>
        </div>
        <div class="mt-5">
          <div
            class="transition cursor-pointer flex items-center px-5 py-2 gap-5 hover:bg-light-700"
            v-for="m in projectStore.members"
            :key="m.userId"
          >
            <el-avatar class="cursor-pointer">{{ m.name.substring(0, 4) }}</el-avatar>
            <div>{{ m.name }}</div>
            <el-tooltip v-if="m.role == 2" content="项目拥有者">
              <el-icon color="#fda118"><management /></el-icon>
            </el-tooltip>
            <el-tooltip content="项目管理者" v-else-if="m.role == 1">
              <el-icon color="#41bfb7"><lollipop /></el-icon>
            </el-tooltip>
          </div>
        </div>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { searchUserApi } from '@/api/user'
import { useProjectStore } from '@/store'
import { Management, Lollipop } from '@element-plus/icons-vue'

const props = defineProps<{ visible: boolean }>()
const { visible } = toRefs(props)
const emits = defineEmits(['update:visible', 'updateMembers'])
const projectStore = useProjectStore()

const searchName = ref('')
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  if (!queryString) {
    cb([])
    return
  }
  try {
    searchUserApi(queryString).then((res) => cb(res))
  } catch (error) {
    console.log(error)
  }
}
interface SimpleUser {
  name: string
  id: number
}
const currentInviteUser = ref<SimpleUser>()
const handleSelect = (item: { value: any }) => {
  currentInviteUser.value = item as unknown as SimpleUser
}

// =================================
</script>
<style scoped>
.member-drawer:deep() .el-drawer.rtl {
  height: calc(100% - var(--height-nav-project));
  top: var(--height-nav-project);
}
</style>
