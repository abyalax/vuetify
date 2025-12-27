import type { TFilterParams, TResponseList } from '@/common/meta'
import type { FormDataCandidate } from '@/pages/candidate/_components/form/candidate-schema'
import type { Candidate } from '@/types'
import { http } from '@/libs/axios/http'

export const candidateApi = {
  async list (params: TFilterParams): Promise<TResponseList<Candidate>> {
    return await http.get('/candidates', { params }).then(r => r.data)
  },

  async detail (id: string): Promise<Candidate> {
    const r = await http.get(`/candidates/${id}`)
    return r.data
  },

  async create (payload: FormDataCandidate): Promise<Candidate> {
    const r = await http.post('/candidates', payload)
    return r.data
  },

  async update (id: string, payload: FormDataCandidate): Promise<Candidate> {
    console.log(id)
    const r = await http.put(`/candidates/${id}`, payload)
    return r.data
  },

  async delete (id: string): Promise<void> {
    const r = await http.delete(`/candidates/${id}`)
    return r.data
  },
}
