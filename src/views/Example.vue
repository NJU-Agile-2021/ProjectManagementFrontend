<template>
  <div v-loading="loading">
    <p>这是ref绑定的值，5s后更改：{{ refText }}</p>
    <p>这是对象绑定的值，5s后更改：{{ reactiveText.text }}</p>
    <p>这是网络请求示例一，成功后更改：{{ api1Text }}</p>
    <p>Upload请求示例二，成功后更改：{{ api2Text.text }}</p>
    <div
      ><label for="avatar">Choose a profile picture:</label>
      <input
        type="file"
        ref="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        @change="uploadFile"
    /></div>
  </div>
</template>
<script setup lang="ts" async>
import { Result } from '#/axios'
import { exampleApiGet } from '@/api'
import { useGetDetail } from '@/composable'
import { mockHttp as request } from '@/utils/http'
const { detail: api1Text, loading, fetchDetail } = useGetDetail(exampleApiGet)()
setTimeout(() => {
  fetchDetail()
}, 5000)

const refText = ref('未修改')
const reactiveText = reactive({ text: '未修改' })
const api2Text = reactive({ text: '未修改' })
let timer1 = setTimeout(() => {
  refText.value = '已修改'
  reactiveText.text = '已修改'
  clearTimeout(timer1)
}, 5000)

const avatar = ref<HTMLInputElement | null>(null)
const uploadFile = (event: unknown) => {
  console.log(event)
  avatar.value?.files?.length &&
    request
      .uploadFile<Result<null>>(
        { url: '/upload' },
        { file: avatar.value.files[0], data: { a: [1, 2], b: 'bb' } }
      )
      .then((res) => {
        if (res?.data?.success) {
          api2Text.text = '成功上传'
        }
      })
}
</script>
