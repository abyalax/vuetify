import type { User } from '@/types'
import { useAuthStore } from './auth-store'

export type RouteAuthMeta = {
  requiresAuth?: boolean
  roles?: string[]
  permissions?: string[]
  redirectTo?: string
}

export function hasRole (user: User, roles: string[]): boolean {
  return user.roles.some(r => roles.includes(r.name))
}

export function hasPermission (user: User, permissions: string[]): boolean {
  return user.permissions.some(p => permissions.includes(p.key))
}

export function canAccess (
  user: User | null,
  meta: RouteAuthMeta,
): boolean {
  if (meta.requiresAuth && !user) {
    return false
  }

  if (meta.roles?.length && user && !hasRole(user, meta.roles)) {
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
