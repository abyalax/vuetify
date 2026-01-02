import type { User } from '@/types'
import { type DefaultBodyType, HttpResponse } from 'msw'
import { getSession } from '@/libs/session'

export function sanitizeUser (user: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safeUser } = user
  return safeUser
}

export function extractBearerToken (headers: Headers): string | undefined {
  const auth = headers.get('authorization')
  if (!auth) {
    return
  }
  const [type, token] = auth.split(' ')
  if (type !== 'Bearer') {
    return
  }
  return token
}

export async function requireAuth (
  headers: Headers,
): Promise<{ userId: IDBValidKey } | HttpResponse<DefaultBodyType>> {
  const token = extractBearerToken(headers)
  const session = getSession(token)
  if (!session) {
    return HttpResponse.json(
      { message: 'Unauthorized' },
      { status: 401 },
    )
  }
  return { userId: session.userId }
}
