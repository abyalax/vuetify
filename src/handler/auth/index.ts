import { http, HttpResponse } from 'msw'
import { createSession, destroySession, extractToken, getSession } from '@/libs/session'
import { userRepository } from '../user/data'
import { sanitizeUser } from './service'

export const authHandler = [
  /**
   * POST LOGIN
   */
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as {
      email: string
      password: string
    }

    const users = await userRepository.getAll()
    const user = users.find(
      u => u.email === body.email && u.password === body.password,
    )

    if (!user) {
      return HttpResponse.json(
        { message: 'Email or password is incorrect' },
        { status: 400 },
      )
    }

    const session = createSession(user.id)

    return HttpResponse.json({
      token: session.token,
      user: sanitizeUser(user),
    })
  }),

  /**
   * GET SESSION (ME)
   */
  http.get('/api/users/me', async ({ request }) => {
    const token = extractToken(request.headers)
    const session = getSession(token)

    if (!session) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 },
      )
    }

    const user = await userRepository.getById(session.userId)
    if (!user) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 },
      )
    }

    return HttpResponse.json(sanitizeUser(user))
  }),

  /**
   * LOGOUT
   */
  http.post('/api/auth/logout', async ({ request }) => {
    const token = extractToken(request.headers)
    if (token) {
      destroySession(token)
    }

    return HttpResponse.json({ success: true })
  }),
]
