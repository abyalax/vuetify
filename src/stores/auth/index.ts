import type { User } from '@/types'
import { useAuthStore } from './auth-store'

export type RouteAuthMeta = {
  requiresAuth?: boolean
  permissions?: string[] | string[][] // Support AND (string[]) or OR of ANDs (string[][])
}

/**
 * Extract user permissions from roles structure
 * Returns Set of permission keys for efficient lookup (for route check)
 */
function getUserPermissionKeys (user: User | null): Set<string> {
  if (!user) {
    return new Set()
  }

  // Prefer roles structure, fallback to permissions for backward compatibility
  if (user.roles && user.roles.length > 0) {
    return new Set(
      user.roles
        .flatMap(role => role.permissions.map(p => p.key)),
    )
  }

  // Fallback to direct permissions array
  if (user.permissions && user.permissions.length > 0) {
    return new Set(user.permissions.map(p => p.key))
  }

  return new Set()
}

/**
 * Extract user permission names from roles structure
 * Returns array of permission names (for UI/component check)
 */
export function getUserPermissionKey (user: User | null): string[] {
  if (!user) {
    return []
  }

  // Prefer roles structure, fallback to permissions for backward compatibility
  if (user.roles && user.roles.length > 0) {
    return user.roles
      .flatMap(role => role.permissions.map(p => p.key))
  }

  // Fallback to direct permissions array
  if (user.permissions && user.permissions.length > 0) {
    return user.permissions.map(p => p.key)
  }

  return []
}

/**
 * Check if user has permission (for UI/component - uses permission.name)
 * Logic: AND - semua permission harus ada
 */
export function hasPermission (user: User | null, permissions: string[]): boolean {
  if (!user || !permissions || permissions.length === 0) {
    return false
  }

  const userPermissions = getUserPermissionKey(user)
  // AND logic - semua permission harus ada
  return permissions.every(p => userPermissions.includes(p))
}

/**
 * Check if user has required permissions
 * Supports:
 * - AND logic: string[] - all permissions must be present
 * - OR of ANDs: string[][] - one group must be satisfied, within group all must be present
 *
 * @param userPermissions - Set of user's permission keys
 * @param requiredPermissions - Required permissions (string[] for AND, string[][] for OR of ANDs)
 * @returns true if user has required permissions
 */
function checkPermissions (
  userPermissions: Set<string>,
  requiredPermissions: string[] | string[][],
): boolean {
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true
  }

  // Check if it's 2D array (OR of ANDs)
  if (Array.isArray(requiredPermissions[0])) {
    // permissions: string[][] -> OR logic for outer arrays
    // Each inner array is AND logic
    // Example: [[PERM1], [PERM2, PERM3]] -> (PERM1) OR (PERM2 AND PERM3)
    const permissionGroups = requiredPermissions as string[][]
    return permissionGroups.some(group =>
      group.every(p => userPermissions.has(p)),
    )
  } else {
    // permissions: string[] -> AND logic
    // Example: [PERM1, PERM2] -> PERM1 AND PERM2
    const permissions = requiredPermissions as string[]
    return permissions.every(p => userPermissions.has(p))
  }
}

/**
 * Check if user can access route based on meta requirements
 */
export function canAccess (
  user: User | null,
  meta: RouteAuthMeta,
): boolean {
  // Check authentication requirement
  if (meta.requiresAuth && !user) {
    return false
  }

  // Check permissions if specified
  if (meta.permissions && meta.permissions.length > 0) {
    const userPermissions = getUserPermissionKeys(user)
    return checkPermissions(userPermissions, meta.permissions)
  }

  return true
}

/**
 * Router guard for authentication and permission checking
 */
export function authGuard (to: any) {
  const auth = useAuthStore()
  const meta = to.meta ?? {}

  // Check if route requires authentication
  if (meta.requiresAuth && !auth.isAuthenticated) {
    auth.returnUrl = to.fullPath
    return '/auth/login'
  }

  // Check permissions if user is authenticated and route has permission requirements
  if (auth.isAuthenticated && meta.permissions && meta.permissions.length > 0 && !canAccess(auth.user, meta)) {
    return '/403'
  }

  // Allow access
  return
}
