import { defineStore } from 'pinia'
import router from '@/router'
import { fetchWrapper, type UserData } from '@/utils/helpers/fetch-wrapper'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in

    user: JSON.parse(localStorage.getItem('user') ?? 'null') as UserData | null,
    returnUrl: '',
  }),
  actions: {
    async login (username: string, password: string) {
      const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })

      // update pinia state
      this.user = user
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))
      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/dashboard')
    },
    logout () {
      this.user = null
      localStorage.removeItem('user')
      router.push('/auth/login')
    },
  },
})
