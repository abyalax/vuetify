import type { TResponseList } from '@/common/meta'
import type { Candidate, CreateCandidate, UpdateCandidate } from '@/types'
import { http, HttpResponse } from 'msw'
import { paginate } from '@/libs/storage/repository'
import { CandidateRepository } from './data'

const candidateRepository = new CandidateRepository()

export const candidateHandlers = [
  /**
   * GET LIST
   */
  http.get('/api/candidates', async ({ request }) => {
    const url = new URL(request.url)
    const data = await candidateRepository.getAll()

    const page = Number(url.searchParams.get('page') ?? 1)
    const perPage = Number(url.searchParams.get('per_page') ?? 10)
    const search = url.searchParams.get('search')?.toLowerCase()

    let filtered = [...data]

    if (search) {
      filtered = filtered.filter(candidate =>
        candidate.fullName.toLowerCase().includes(search),
      )
    }

    const paginated = paginate(filtered, page, perPage)

    const response: TResponseList<Candidate> = {
      items: paginated,
      meta: {
        page,
        per_page: perPage,
        total: filtered.length,
        total_page: Math.ceil(filtered.length / perPage),
      },
    }

    return HttpResponse.json(response)
  }),

  /**
   * GET DETAIL
   */
  http.get('/api/candidates/:id', async ({ params }) => {
    const data = await candidateRepository.getById(String(params.id))
    return HttpResponse.json(data)
  }),

  /**
   * CREATE
   */
  http.post('/api/candidates', async ({ request }) => {
    const body = (await request.json()) as CreateCandidate

    const now = new Date().toISOString()

    const newCandidate: Candidate = {
      ...body,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    }

    candidateRepository.create([newCandidate])

    return HttpResponse.json(newCandidate, { status: 201 })
  }),

  /**
   * UPDATE
   */
  http.put('/api/candidates/:id', async ({ params, request }) => {
    console.log(params.id)
    const body = (await request.json()) as UpdateCandidate
    const updated = await candidateRepository.update(String(params.id), body)
    return HttpResponse.json(updated)
  }),

  /**
   * DELETE
   */
  http.delete('/api/candidates/:id', async ({ params }) => {
    await candidateRepository.delete(String(params.id))
    return HttpResponse.json(null, { status: 204 })
  }),
]
