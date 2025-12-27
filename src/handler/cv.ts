import type { TResponseList } from '@/common/meta'
import type { CreateCV, CV, UpdateCV } from '@/types'
import { http, HttpResponse } from 'msw'
import { paginate } from '@/libs/storage/repository'
import { CVRepository } from './data'

const cvRepository = new CVRepository()

export const cvHandlers = [
  /**
   * GET LIST
   */
  http.get('/api/cvs', async ({ request }) => {
    const url = new URL(request.url)
    const data = await cvRepository.getAll()

    const page = Number(url.searchParams.get('page') ?? 1)
    const perPage = Number(url.searchParams.get('per_page') ?? 10)
    const search = url.searchParams.get('search')?.toLowerCase()

    let filtered = [...data]

    if (search) {
      filtered = filtered.filter(cv =>
        cv.name.toLowerCase().includes(search),
      )
    }

    const paginated = paginate(filtered, page, perPage)

    const response: TResponseList<CV> = {
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
  http.get('/api/cvs/:id', async ({ params }) => {
    const data = await cvRepository.getById(String(params.id))
    return HttpResponse.json(data)
  }),

  /**
   * CREATE
   */
  http.post('/api/cvs', async ({ request }) => {
    const body = (await request.json()) as CreateCV

    const now = new Date().toISOString()

    const newCV: CV = {
      ...body,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    }

    cvRepository.create([newCV])

    return HttpResponse.json(newCV, { status: 201 })
  }),

  /**
   * UPDATE
   */
  http.put('/api/cvs/:id', async ({ params, request }) => {
    console.log(params.id)
    const body = (await request.json()) as UpdateCV
    console.log(body)
    const updated = await cvRepository.update(String(params.id), body)
    return HttpResponse.json(updated)
  }),

  /**
   * DELETE
   */
  http.delete('/api/cvs/:id', async ({ params }) => {
    await cvRepository.delete(String(params.id))
    return HttpResponse.json(null, { status: 204 })
  }),
]
