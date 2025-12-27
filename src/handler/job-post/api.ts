import type { TResponseList } from '@/common/meta'
import type { CreateJobPost, JobPost, UpdateJobPost } from '@/types'
import { http, HttpResponse } from 'msw'
import { paginate } from '@/libs/storage/repository'
import { JobPostRepository } from './data'

const jobPostRepository = new JobPostRepository()

export const jobPostHandlers = [
  /**
   * GET LIST
   */
  http.get('/api/job-post', async ({ request }) => {
    const url = new URL(request.url)
    const data = await jobPostRepository.getAll()

    const page = Number(url.searchParams.get('page') ?? 1)
    const perPage = Number(url.searchParams.get('per_page') ?? 10)
    const search = url.searchParams.get('search')?.toLowerCase()

    let filtered = [...data]

    if (search) {
      filtered = filtered.filter(candidate =>
        candidate.title.toLowerCase().includes(search),
      )
    }

    const paginated = paginate(filtered, page, perPage)

    const response: TResponseList<JobPost> = {
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
  http.get('/api/job-post/:id', async ({ params }) => {
    const data = await jobPostRepository.getById(String(params.id))
    return HttpResponse.json(data)
  }),

  /**
   * CREATE
   */
  http.post('/api/job-post', async ({ request }) => {
    const body = (await request.json()) as CreateJobPost

    const now = new Date().toISOString()

    const newCandidate: JobPost = {
      ...body,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    }

    jobPostRepository.create([newCandidate])

    return HttpResponse.json(newCandidate, { status: 201 })
  }),

  /**
   * UPDATE
   */
  http.put('/api/job-post/:id', async ({ params, request }) => {
    console.log(params.id)
    const body = (await request.json()) as UpdateJobPost
    const updated = await jobPostRepository.update(String(params.id), body)
    return HttpResponse.json(updated)
  }),

  /**
   * DELETE
   */
  http.delete('/api/job-post/:id', async ({ params }) => {
    await jobPostRepository.delete(String(params.id))
    return HttpResponse.json(null, { status: 204 })
  }),
]
