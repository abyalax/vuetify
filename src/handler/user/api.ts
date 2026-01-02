import type { TResponseList } from '@/common/meta'
import type { CreateUser, UpdateUser, User } from '@/types'
import { http, HttpResponse } from 'msw'
import { paginate } from '@/libs/storage/repository'
import { userRepository } from './data'

export const userHandlers = [
  /**
   * GET LIST
   */
  http.get('/api/users', async ({ request }) => {
    const url = new URL(request.url)
    const data = await userRepository.getAll()

    const page = Number(url.searchParams.get('page') ?? 1)
    const perPage = Number(url.searchParams.get('per_page') ?? 10)
    const search = url.searchParams.get('search')?.toLowerCase()

    let filtered = [...data]

    if (search) {
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(search),
      )
    }

    const paginated = paginate(filtered, page, perPage)

    const response: TResponseList<User> = {
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
  http.get('/api/users/:id', async ({ params }) => {
    const data = await userRepository.getById(String(params.id))
    return HttpResponse.json(data)
  }),

  /**
   * CREATE
   */
  http.post('/api/users', async ({ request }) => {
    const body = (await request.json()) as CreateUser

    const newCandidate: User = {
      ...body,
      id: crypto.randomUUID(),
    }

    userRepository.create([newCandidate])

    return HttpResponse.json(newCandidate, { status: 201 })
  }),

  /**
   * UPDATE
   */
  http.put('/api/users/:id', async ({ params, request }) => {
    console.log(params.id)
    const body = (await request.json()) as UpdateUser
    const updated = await userRepository.update(String(params.id), body)
    return HttpResponse.json(updated)
  }),

  /**
   * DELETE
   */
  http.delete('/api/users/:id', async ({ params }) => {
    await userRepository.delete(String(params.id))
    return HttpResponse.json(null, { status: 204 })
  }),
]
