import type { TFilterParams, TResponseList } from '@/common/meta'
import type { FormDataJobPost } from '@/pages/job-post/_components/form/job-schema'
import type { JobPost } from '@/types'
import { http } from '@/libs/axios/http'

export const jobPostApi = {
  async list (params: TFilterParams): Promise<TResponseList<JobPost>> {
    return await http.get('/job-post', { params }).then(r => r.data)
  },

  async detail (id: string): Promise<JobPost> {
    const r = await http.get(`/job-post/${id}`)
    return r.data
  },

  async create (payload: FormDataJobPost): Promise<JobPost> {
    const r = await http.post('/job-post', payload)
    return r.data
  },

  async update (id: string, payload: FormDataJobPost): Promise<JobPost> {
    console.log(id)
    const r = await http.put(`/job-post/${id}`, payload)
    return r.data
  },

  async delete (id: string): Promise<void> {
    const r = await http.delete(`/job-post/${id}`)
    return r.data
  },
}
