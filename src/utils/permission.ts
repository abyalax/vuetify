/**
 * Utility functions for permission filtering
 */

type Permission = Record<string, unknown>

type PermissionWithoutChildren = Permission

type PermissionWithChildren = Permission & {
  children: (PermissionWithChildren | PermissionWithoutChildren)[]
}

function isPermissionWithChildren (permission: PermissionWithChildren | PermissionWithoutChildren): permission is PermissionWithChildren {
  return 'children' in permission && Array.isArray(permission.children)
}

/**
 * Filter permissions untuk nested structures (seperti sidebar menu dengan children)
 * Support recursive filtering untuk nested menus
 *
 * @param menus - Array of menu items with potential nested children
 * @param hasPermissionCB - Callback function yang return true jika item memiliki permission
 * @returns Filtered array dengan nested structure tetap terjaga
 *
 * @example
 * const filteredItems = filterPermission(SIDEBAR_ITEMS, (item) => {
 *   return item.permissions === undefined ||
 *          item.permissions.some((perm) => userPermissions.includes(perm));
 * });
 */
export function filterPermission<T extends PermissionWithChildren | PermissionWithoutChildren> (
  menus: T[],
  hasPermissionCB: (menu: T) => boolean,
): T[] {
  return menus.reduce((all, menu) => {
    // Check if menu has children
    if (isPermissionWithChildren(menu) && menu.children.length > 0) {
      // Recursively filter children
      const children = filterPermission(menu.children as T[], hasPermissionCB)
      if (children.length > 0) {
        // If children exist after filtering, include parent with filtered children
        const currentPermission = { ...menu } as T
        ;(currentPermission as PermissionWithChildren).children = children as (PermissionWithChildren | PermissionWithoutChildren)[]
        all.push(currentPermission)
      }
      // If no children remain, don't include parent
    } else if (hasPermissionCB(menu)) {
      // Check permission through callback
      all.push(menu)
    }
    return all
  }, [] as T[])
}
