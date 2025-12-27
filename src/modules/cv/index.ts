import type { TFilterParams, TResponseList } from '@/common/meta'
import type { FormDataCV } from '@/pages/cv/_components/form/cv-schema'
import type { CV } from '@/types'
import { http } from '@/libs/axios/http'

export const cvApi = {
  async list (params: TFilterParams): Promise<TResponseList<CV>> {
    return await http.get('/cvs', { params }).then(r => r.data)
  },

  async detail (id: string): Promise<CV> {
    const r = await http.get(`/cvs/${id}`)
    return r.data
  },

  async create (payload: FormDataCV): Promise<CV> {
    const r = await http.post('/cvs', payload)
    return r.data
  },

  async update (id: string, payload: FormDataCV): Promise<CV> {
    console.log(id)
    const r = await http.put(`/cvs/${id}`, payload)
    return r.data
  },

  async delete (id: string): Promise<void> {
    const r = await http.delete(`/cvs/${id}`)
    return r.data
  },
}
