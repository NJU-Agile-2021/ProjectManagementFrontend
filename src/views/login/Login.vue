<template>
  <div class="app-container__login">
    <div class="content-container relative h-full py-2 <lg:px-5">
      <div class="flex h-full items-center justify-center">
        <div class="flex flex-col w-1/2 min-h-full text-white <lg:hidden">
          <div class="flex items-center pt-10 animate-animated animate-fade-in-left">
            <img :src="logoUrl" class="w-12 h-12 mr-2" />
            <h2>{{ appStore.title }}</h2>
          </div>
          <div class="my-auto">
            <img :src="loginBoxUrl" class="w-1/2 animate-animated animate-fade-in-left" />
            <div class="mt-15 text-3xl font-medium animate-animated animate-fade-in-left">
              敏捷项目管理工具
            </div>
            <div class="mt-5 text-base animate-animated animate-fade-in-left"
              >让您的成功案例可以复制，登陆即可使用！</div
            >
          </div>
        </div>
        <div class="relative flex items-center justify-center pb-10 h-full">
          <div class="w-80 animate-animated animate-fade-in-right">
            <template v-if="showLoginForm">
              <div class="text-3xl text-center mb-5 font-semibold">欢迎使用</div>
              <el-form size="large" :model="loginFormData" ref="loginForm" :rules="loginFormRules">
                <el-form-item prop="name">
                  <el-input
                    v-model="loginFormData.name"
                    placeholder="请输入用户名"
                    clearable
                    :prefix-icon="UserFilled"
                  />
                </el-form-item>
                <el-form-item prop="pwd">
                  <el-input
                    v-model="loginFormData.pwd"
                    placeholder="请输入密码"
                    type="password"
                    clearable
                    show-password
                    :prefix-icon="Lock"
                  />
                </el-form-item>
                <div class="flex items-center justify-between mb-2">
                  <el-checkbox size="large" v-model="rememberPassword" label="记住密码" />
                  <el-button type="text" size="large" @click="showLoginForm = false"
                    >注册新用户</el-button
                  >
                </div>
                <el-form-item>
                  <el-button
                    type="primary"
                    class="w-full"
                    @click="submitLoginForm"
                    :loading="loginFormButtonLoading"
                    >立即开始</el-button
                  >
                </el-form-item>
              </el-form>
            </template>
            <template v-else>
              <div class="text-3xl text-center mb-5 font-semibold">注册新用户</div>
              <el-form
                size="large"
                :model="registerFormData"
                ref="registerForm"
                :rules="registerFormRules"
              >
                <el-form-item prop="email">
                  <el-input
                    v-model="registerFormData.email"
                    placeholder="请输入邮箱"
                    clearable
                    type="email"
                    :prefix-icon="Message"
                  />
                </el-form-item>
                <el-form-item prop="name">
                  <el-input
                    v-model="registerFormData.name"
                    placeholder="请输入用户名"
                    clearable
                    :prefix-icon="UserFilled"
                  />
                </el-form-item>
                <el-form-item prop="pwd">
                  <el-input
                    v-model="registerFormData.pwd"
                    placeholder="请输入密码"
                    type="password"
                    clearable
                    show-password
                    :prefix-icon="Lock"
                  />
                </el-form-item>
                <el-form-item prop="pwd2">
                  <el-input
                    v-model="registerFormData.pwd2"
                    placeholder="再次确认密码"
                    type="password"
                    show-password
                    clearable
                    :prefix-icon="Lock"
                  />
                </el-form-item>
                <div class="grid grid-cols-2 justify-between">
                  <el-button plain class="w-full" @click="showLoginForm = true">返回</el-button>
                  <el-button
                    type="primary"
                    class="max-w-full"
                    @click="submitRegisterForm"
                    :loading="registerFormButtonLoading"
                    >立即注册</el-button
                  >
                </div>
              </el-form>
            </template>
          </div>
          <div class="absolute bottom-0 right-0 w-full text-sm">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { createDefaultUserParam } from '@/api/user'
import logoUrl from '@/assets/logo.png?url'
import loginBoxUrl from '@/assets/svg/login-box.svg?url'
import Footer from '@/components/Footer.vue'
import { createRule } from '@/components/forms'
import { useAppStore, useUserStore } from '@/store'
import { Lock, Message, UserFilled } from '@element-plus/icons-vue'
import { ElMessage, ElNotification } from 'element-plus'

const appStore = useAppStore()

const showLoginForm = ref(true)
const userStore = useUserStore()
// ============================ 登录 ==============================
const loginFormData = ref(createDefaultUserParam())
const loginForm = ref()
const loginFormRules = ref({
  name: createRule('用户名不能为空'),
  pwd: createRule('密码不能为空'),
})
const loginFormButtonLoading = ref(false)
const submitLoginForm = async () => {
  await loginForm.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        loginFormButtonLoading.value = true
        const userInfo = await userStore.login(loginFormData.value)
        if (userInfo) {
          ElNotification.success({
            title: '登陆成功',
            message: `欢迎回来，${userInfo.name}`,
            position: 'top-right',
            duration: 3000,
          })
        }
      } catch (e) {
        ElMessage.error({ message: (e as Error).message })
      } finally {
        loginFormButtonLoading.value = false
      }
    }
  })
}
const rememberPassword = ref(false)
// ============================ 注册 ==============================
const registerFormData = ref({
  ...createDefaultUserParam(),
  pwd2: '',
})
const registerForm = ref()
const validatePass = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (registerFormData.value.pwd2 !== '') {
      if (!registerForm.value) return
      registerForm.value.validateField('pwd2', () => null)
    }
    callback()
  }
}
const validatePass2 = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerFormData.value.pwd) {
    callback(new Error('两次密码不相等！'))
  } else {
    callback()
  }
}
const registerFormRules = ref({
  name: createRule('用户名不能为空'),
  email: createRule('邮箱地址不能为空'),
  pwd: [{ validator: validatePass, trigger: 'blur' }],
  pwd2: [{ validator: validatePass2, trigger: 'blur' }],
})
const registerFormButtonLoading = ref(false)
const submitRegisterForm = async () => {
  await registerForm.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        registerFormButtonLoading.value = true
        const userInfo = await userStore.register(registerFormData.value)
        if (userInfo) {
          ElMessage.success({ message: `注册用户成功：${registerFormData.value.name}！` })
          showLoginForm.value = true
        } else {
          ElMessage.error({ message: '注册失败' })
        }
      } catch (e) {
        ElMessage.error({ message: (e as Error).message })
      } finally {
        registerFormButtonLoading.value = false
      }
    }
  })
}
</script>
<style lang="scss" scoped>
.app-container__login {
  @apply relative w-full h-[100vh] px-4;
  &::before {
    @apply absolute top-0 left-0 w-full h-full;
    margin-left: -48%;
    background-image: url(/@/assets/svg/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
    @screen <lg {
      @apply hidden;
    }
  }
}
</style>
