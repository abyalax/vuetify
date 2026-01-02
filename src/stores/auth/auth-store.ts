import type { User } from '@/types'
import { defineStore } from 'pinia'
import { userApi } from '@/modules/auth'
import router from '@/router'

export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('auth:user') ?? 'null') as User | null,
    token: localStorage.getItem('auth:token') as string | null,
    returnUrl: '',
  }),

  getters: {
    isAuthenticated: state => Boolean(state.token && state.user),
  },

  actions: {
    async login (email: string, password: string) {
      const res = await userApi.login({ email, password })

      this.user = res.data.user
      this.token = res.data.token

      localStorage.setItem('auth:user', JSON.stringify(this.user))
      localStorage.setItem('auth:token', this.token)

      router.push(this.returnUrl || '/dashboard')
    },

    async restoreSession () {
      if (!this.token) {
        return
      }

      try {
        const res = await userApi.session()
        this.user = res.data
        localStorage.setItem('auth:user', JSON.stringify(res.data))
      } catch {
        this.logout()
      }
    },

    async logout () {
      try {
        await userApi.logout()
      } finally {
        this.user = null
        this.token = null

        localStorage.removeItem('auth:user')
        localStorage.removeItem('auth:token')

        router.push('/auth/login')
      }
    },
  },
})
