<template>
  <el-footer>Copyright © {{ new Date().getFullYear() }} {{ appStore.title }}.</el-footer>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>
