import { defineStore } from 'pinia'
import { login as userLogin, register as userRegister, UserForm } from '@/api/user'
import { UserState } from './types'
import { storage } from '@/utils/storage'
import { router } from '@/router'
import { LOGIN_NAME } from '@/router/constant'
const UserStorageKey = 'USER_INFO__KEY'
const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: '',
    email: '',
    id: '' as unknown as number,
  }),

  getters: {
    username(): string {
      return this.name || JSON.parse(storage.getItem(UserStorageKey) ?? '{}')?.name
    },
    userId(): number {
      return this.id || JSON.parse(storage.getItem(UserStorageKey) ?? '{}')?.id
    },
    isLogin(): boolean {
      return !!this.userId
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
      storage.setItem(UserStorageKey, JSON.stringify(partial))
    },

    // Reset user's information
    resetInfo() {
      this.$reset()
      storage.removeItem(UserStorageKey)
    },

    // Login
    async login(loginForm: UserForm) {
      try {
        const res = await userLogin(loginForm)
        this.setInfo(res)
        router.push({ path: '/' })
        return res
      } catch (err) {
        throw err
      }
    },

    // Sign Up
    async register(registerForm: UserForm) {
      try {
        const res = await userRegister(registerForm)
        return res
      } catch (err) {
        throw err
      }
    },

    // Logout
    async logout() {
      this.resetInfo()
      router.push({ name: LOGIN_NAME })
    },
  },
})

export default useUserStore
