import type { TResponseData } from '@/common/meta'
import type { User } from '@/types'
import { http } from '@/libs/axios/http'

export const userApi = {
  async login (payload: { email: string, password: string }): Promise<TResponseData<{ user: User, token: string }>> {
    return await http.post('/auth/login', payload)
  },
  session: () => http.get('/auth/me'),
  logout: () => http.post('/auth/logout'),
}
