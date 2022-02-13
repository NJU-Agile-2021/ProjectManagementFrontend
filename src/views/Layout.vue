<template>
  <el-container class="h-[100vh]">
    <el-aside :width="navBarWidth" class="aside">
      <section class="h-20 flex items-center justify-center">
        <router-link to="/">
          <img alt="Vue logo" src="@/assets/logo.png" class="w-12 h-12" />
        </router-link>
      </section>
      <section class="h-[calc(100%-400px)]">
        <router-link to="/home">
          <div class="aside-btn">
            <el-icon class="text-brand" :size="20">
              <menu-icon />
            </el-icon>
            <span>项目</span>
          </div>
        </router-link>
        <router-link to="/todo">
          <div class="aside-btn">
            <el-icon class="text-brand" :size="20">
              <menu-icon />
            </el-icon>
            <span>待办</span>
          </div>
        </router-link>
      </section>
      <section class="h-60 justify-self-end">
        <div class="aside-btn">
          <el-icon :size="20" :color="brandColor"><circle-plus-filled /></el-icon>
        </div>
        <div class="aside-btn">
          <el-icon :size="20"><search /></el-icon>
        </div>
      </section>
      <section class="h-20 justify-self-end flex justify-center">
        <el-popover
          :width="300"
          placement="right"
          trigger="click"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
          <template #reference>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              class="cursor-pointer hover:border"
            />
          </template>
          <template #default>
            <div class="flex items-center gap-4">
              <el-avatar
                :size="60"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                class="mb-2"
              />
              <div>
                <p>{{ userStore.username }}</p>
                <p class="text-sm text-secondary">{{ userStore.email }}</p>
              </div>
            </div>
            <el-divider />
            <el-button type="danger" :icon="LogoutSvg" @click="() => userStore.logout()"
              >退出登录</el-button
            >
          </template>
        </el-popover>
      </section>
    </el-aside>
    <el-main><router-view /></el-main>
  </el-container>
</template>
<script lang="ts" setup>
import LogoutSvg from '@/assets/svg/LogoutSvg.vue'
import { useUserStore } from '@/store'
import { Menu as MenuIcon, Search, CirclePlusFilled } from '@element-plus/icons-vue'
import { useCssVar } from '@vueuse/core'

const navBarWidth = ref('80px')
const brandColor = useCssVar('--el-color-primary')
const userStore = useUserStore()
</script>
<style lang="scss" scoped>
.aside {
  @apply bg-white py-2 flex flex-col;
  box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
}
.aside-btn {
  @apply cursor-pointer rounded-md mx-auto my-2 py-2 flex flex-col items-center justify-center text-primary text-sm min-h-12 transition hover:(bg-light-500 text-brand);
  width: calc(v-bind('navBarWidth') - 20px);
  span {
    @apply truncate mt-1 w-full text-center;
  }
}
.router-link-active .aside-btn {
  @apply text-brand bg-light-500;
}
</style>
