import type { TResponseList } from '@/common/meta'
import type { CreateMaterial, Material, UpdateMaterial } from '@/types'
import { http, HttpResponse } from 'msw'
import { paginate } from '@/libs/storage/repository'
import { MaterialRepository } from './data'

const materialRepository = new MaterialRepository()

export const materialHandlers = [
  /**
   * GET LIST
   */
  http.get('/api/material', async ({ request }) => {
    const url = new URL(request.url)
    const data = await materialRepository.getAll()

    const page = Number(url.searchParams.get('page') ?? 1)
    const perPage = Number(url.searchParams.get('per_page') ?? 10)
    const search = url.searchParams.get('search')?.toLowerCase()

    let filtered = [...data]

    if (search) {
      filtered = filtered.filter(candidate =>
        candidate.server.toLowerCase().includes(search),
      )
    }

    const paginated = paginate(filtered, page, perPage)

    const response: TResponseList<Material> = {
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
  http.get('/api/material/:id', async ({ params }) => {
    const data = await materialRepository.getById(String(params.id))
    return HttpResponse.json(data)
  }),

  /**
   * CREATE
   */
  http.post('/api/material', async ({ request }) => {
    const body = (await request.json()) as CreateMaterial

    const newCandidate: Material = {
      ...body,
      id: Date.now().toString(),
    }

    materialRepository.create([newCandidate])

    return HttpResponse.json(newCandidate, { status: 201 })
  }),

  /**
   * UPDATE
   */
  http.put('/api/material/:id', async ({ params, request }) => {
    console.log(params.id)
    const body = (await request.json()) as UpdateMaterial
    const updated = await materialRepository.update(String(params.id), body)
    return HttpResponse.json(updated)
  }),

  /**
   * DELETE
   */
  http.delete('/api/material/:id', async ({ params }) => {
    await materialRepository.delete(String(params.id))
    return HttpResponse.json(null, { status: 204 })
  }),
]
