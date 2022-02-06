<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <app-link to="https://code.visualstudio.com/" type="primary">VSCode</app-link>
    +
    <app-link to="https://marketplace.visualstudio.com/items?itemName=octref.vetur" type="primary">
      Vetur
    </app-link>
    or
    <app-link to="https://github.com/johnsoncodehk/volar" type="primary">Volar</app-link>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <app-link to="https://vitejs.dev/guide/features.html" type="primary"> Vite Docs </app-link>
    |
    <app-link to="https://v3.vuejs.org/" type="primary">Vue 3 Docs</app-link>
  </p>

  <el-button plain @click="count++">count is: {{ count }}</el-button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts" setup>
import AppLink from '@/components/AppLink.vue'
defineProps<{ msg: string }>()
const count = ref(0)
</script>

<style scoped lang="scss">
label {
  margin: 0 0.5em;
  @apply font-bold;
}

code {
  @apply px-1 py-0.5 rounded-4px;
  background-color: #eee;
  color: #304455;
}
</style>
