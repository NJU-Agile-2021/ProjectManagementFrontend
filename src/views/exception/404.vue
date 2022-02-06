<template>
  <el-empty description="你的页面找不到了">
    <router-link to="/"
      ><el-button type="primary" :icon="HomeFilled">返回首页</el-button></router-link
    >
  </el-empty>
</template>

<script lang="ts" setup>
import { HomeFilled } from '@element-plus/icons-vue'
import { ElButton, ElEmpty } from 'element-plus'
</script>

<style></style>
