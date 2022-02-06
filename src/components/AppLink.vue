<template>
  <el-link
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="props.to"
    :underline="props.underline"
    :type="props.type"
    target="_blank"
    ><slot></slot
  ></el-link>
  <router-link
    v-else
    v-bind="omit(props, 'underline', 'type', 'class')"
    custom
    v-slot="{ href, navigate }"
  >
    <el-link
      :href="href"
      @click="navigate"
      :underline="props.underline"
      :type="props.type"
      v-bind="$attrs"
    >
      <slot></slot>
    </el-link>
  </router-link>
</template>

<script lang="ts" setup>
import { omit } from 'lodash-es'
import { computed } from 'vue'
import { RouterLinkProps } from 'vue-router'
interface AppLinkProps extends RouterLinkProps {
  to: string
  underline?: boolean
  type?: 'primary' | 'warning' | 'default' | 'success' | 'info' | 'danger'
}
const props = withDefaults(defineProps<AppLinkProps>(), {
  underline: true,
  type: 'default',
})
const isExternalLink = computed(() => {
  return props.to.startsWith('http')
})
</script>
