export type Session = {
  token: string
  userId: IDBValidKey
}

const sessions = new Map<string, Session>()

export function createSession (userId: IDBValidKey): Session {
  const token = `jwt-${crypto.randomUUID()}`
  const session = { token, userId }
  sessions.set(token, session)
  return session
}

export function getSession (token?: string | null): Session | undefined {
  if (!token) {
    return
  }
  return sessions.get(token)
}

export function destroySession (token: string) {
  sessions.delete(token)
}

export function extractToken (headers: Headers) {
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
