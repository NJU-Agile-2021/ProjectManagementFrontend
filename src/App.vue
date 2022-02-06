<template>
  <el-config-provider :locale="zhCn">
    <div class="content-container text-center pt-15">
      <div>
        <app-link to="/" type="primary" :underline="false">Home</app-link>
        <el-divider direction="vertical" />
        <app-link to="/login" :underline="false">Login</app-link>
        <el-divider direction="vertical" />
        <app-link to="/404" :underline="false">404</app-link>
      </div>
      <router-view />
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import AppLink from '@/components/AppLink.vue'
import { usePageTitle } from '@/composable'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

usePageTitle()
</script>
