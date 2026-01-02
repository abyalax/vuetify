import type { User } from '@/types'
import { useAuthStore } from './auth-store'

export type RouteAuthMeta = {
  requiresAuth?: boolean
  role?: string
  permissions?: string[]
  redirectTo?: string
}

export function hasPermission (user: User | null, permissions: string[]): boolean {
  if (user === null) {
    return false
  }
  return user.permissions.some(p => permissions.includes(p.key))
}

export function canAccess (
  user: User | null,
  meta: RouteAuthMeta,
): boolean {
  if (meta.requiresAuth && !user) {
    return false
  }

  if (meta.role && user && user.role === meta.role) {
    return false
  }

  if (meta.permissions?.length && user && !hasPermission(user, meta.permissions)) {
    return false
  }

  return true
}

export function authGuard (to: any) {
  const auth = useAuthStore()
  const meta = to.meta ?? {}

  if (canAccess(auth.user, meta)) {
    return
  }

  if (!auth.isAuthenticated) {
    auth.returnUrl = to.fullPath
    return meta.redirectTo || '/auth/login'
  }

  return '/403'
}
