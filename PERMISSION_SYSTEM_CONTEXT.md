# Permission System Implementation - Context Documentation

> Dokumentasi lengkap implementasi Permission System untuk digunakan sebagai context knowledge AI Agent

## Table of Contents

1. [Overview](#overview)
2. [Struktur Data](#struktur-data)
3. [Permission Constants](#permission-constants)
4. [Utility Functions](#utility-functions)
5. [Route-Level Permission](#route-level-permission)
6. [Component-Level Permission](#component-level-permission)
7. [Middleware-Level Permission](#middleware-level-permission)
8. [Sidebar/Menu Permission Filtering](#sidebarmenu-permission-filtering)
9. [Pattern Summary](#pattern-summary)
10. [Vue Implementation Guide](#vue-implementation-guide)

---

## Overview

Sistem permission menggunakan role-based access control (RBAC) dengan struktur:
- **User** memiliki banyak **Roles**
- **Role** memiliki banyak **Permissions**
- Permission check dilakukan di 3 level: Route, Component, dan Middleware

### Key Concepts:
- **Permission Name**: String seperti "READ USERS" - digunakan untuk Guard component, middleware, sidebar
- **Permission Key**: String seperti "read-users" - digunakan untuk route loader
- **AND Logic**: Semua permission harus ada (`string[]`)
- **OR of ANDs**: Salah satu group terpenuhi, dalam group semua harus ada (`string[][]`)
- **OR Logic**: Salah satu permission cukup (menggunakan `.some()`)

---

## Struktur Data

### Type Definitions

```typescript
// User memiliki roles, dan setiap role memiliki permissions
type TUserItem = {
  id: string;
  name: string;
  email?: string;
  username?: string;
  login_type?: "username" | "email";
  created_at: string;
  updated_at: string;
  roles: Array<TRoleItem>;
};

type TRoleItem = {
  id: string;
  name: string;
  key: string;
  permissions: Array<TPermissionItem>;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
};

type TPermissionItem = {
  id: string;
  name: string;  // digunakan untuk permission check (contoh: "READ USERS")
  key: string;   // digunakan untuk route loader (contoh: "read-users")
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
};
```

### Session Structure

User session disimpan di localStorage dengan struktur:
```typescript
{
  user: {
    id: string;
    name: string;
    email: string;
    roles: [
      {
        id: string;
        name: string;
        key: string;
        permissions: [
          {
            id: string;
            name: "READ USERS";
            key: "read-users";
          },
          // ... more permissions
        ]
      },
      // ... more roles
    ]
  }
}
```

---

## Permission Constants

**File**: `src/commons/constants/permissions.ts`

```typescript
export const PERMISSIONS = {
  DASHBOARD: {
    READ_DASHBOARD: "READ DASHBOARD",
    READ_DASHBOARD_ANALYTIC: "READ DASHBOARD ANALYTIC",
  },
  FAQS: {
    READ_FAQS: "READ FAQS",
    CREATE_FAQS: "CREATE FAQS",
    UPDATE_FAQS: "UPDATE FAQS",
    DELETE_FAQS: "DELETE FAQS",
  },
  USERS: {
    READ_USERS: "READ USERS",
    CREATE_USERS: "CREATE USERS",
    UPDATE_USERS: "UPDATE USERS",
    DELETE_USERS: "DELETE USERS",
  },
  ROLES: {
    READ_ROLES: "READ ROLES",
    CREATE_ROLES: "CREATE ROLES",
    UPDATE_ROLES: "UPDATE ROLES",
    DELETE_ROLES: "DELETE ROLES",
  },
  PERMISSIONS: {
    READ_PERMISSIONS: "READ PERMISSIONS",
    CREATE_PERMISSIONS: "CREATE PERMISSIONS",
    UPDATE_PERMISSIONS: "UPDATE PERMISSIONS",
    DELETE_PERMISSIONS: "DELETE PERMISSIONS",
  },
};
```

**Pattern Naming**: `{MODULE}_{ACTION}_{RESOURCE}` (contoh: `READ_USERS`, `CREATE_ROLES`)

---

## Utility Functions

### 1. checkPermission

**File**: `src/utils/permission.ts`

```typescript
import { hasCommonElements } from "./has-common-element";

type TPermissionChecker = {
  permissions: Array<string>;
  userPermissions?: Array<string>;
  customCondition?: boolean;
};

/**
 * Checks if the user has the required permissions and meets a custom condition.
 * Logic: Menggunakan AND - semua permissions harus ada
 * 
 * @param {Object} params - The parameters for the permission check.
 * @param {string[]} params.permissions - The required permissions.
 * @param {string[]} params.userPermissions - The user's permissions.
 * @param {boolean} [params.customCondition=true] - An optional custom condition that must also be met.
 * @returns {boolean} - Returns `true` if the user has the required permissions and meets the custom condition, otherwise `false`.
 * 
 * @example
 * const permissions = ['READ USERS', 'CREATE USERS'];
 * const userPermissions = ['READ USERS', 'DELETE USERS'];
 * const customCondition = true;
 * const hasAccess = checkPermission({ permissions, userPermissions, customCondition });
 * // Returns: false (karena CREATE USERS tidak ada)
 */
export const checkPermission = ({
  permissions,
  userPermissions,
  customCondition = true,
}: TPermissionChecker): boolean => {
  if (!userPermissions) return false;
  const hasPermission = hasCommonElements(permissions, userPermissions);
  return hasPermission && customCondition;
};
```

### 2. filterPermission

**File**: `src/utils/permission.ts`

```typescript
type Permission = Record<string, unknown>;

type PermissionWithoutChildren = Permission;

type PermissionWithChildren = Permission & {
  children: (PermissionWithChildren | PermissionWithoutChildren)[];
};

const isPermissionWithChildren = (
  permission: PermissionWithChildren | PermissionWithoutChildren,
): permission is PermissionWithChildren => {
  return "children" in permission;
};

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
export const filterPermission = <
  T extends PermissionWithChildren | PermissionWithoutChildren,
>(
  menus: T[],
  hasPermissionCB: (menu: T) => boolean,
): T[] => {
  return menus.reduce((all, menu) => {
    // Check permission type and length
    if (isPermissionWithChildren(menu) && menu.children.length > 0) {
      const children = filterPermission(menu.children as T[], hasPermissionCB);
      if (children.length > 0) {
        const currentPermission = menu;
        currentPermission.children = children;
        all.push(currentPermission);
      }
      // check permission through callback
    } else if (hasPermissionCB(menu)) {
      all.push(menu);
    }
    return all;
  }, [] as T[]);
};
```

### 3. hasCommonElements (Helper)

**File**: `src/utils/has-common-element.ts`

```typescript
/**
 * Checks if two arrays have any common elements.
 * Optimized untuk performa dengan menggunakan Set untuk array yang lebih pendek
 * 
 * @template T - The type of elements in the arrays.
 * @param arr1 - The first array to compare.
 * @param arr2 - The second array to compare.
 * @returns `true` if there are common elements between the two arrays, otherwise `false`.
 * 
 * @example
 * hasCommonElements([1, 2], [3, 4, 1]); // true
 * hasCommonElements([1, 2], [3, 4]); // false
 */
export function hasCommonElements<T>(arr1: T[], arr2: T[]): boolean {
  const [shorter, longer] =
    arr1?.length < arr2?.length ? [arr1, arr2] : [arr2, arr1];
  const set = new Set<T>(shorter);
  return longer?.some((element) => set.has(element));
}
```

### 4. Pattern Mengambil User Permissions

Pattern yang digunakan di berbagai tempat untuk mendapatkan user permissions:

```typescript
// Pattern 1: Dari session context (untuk component)
const { session } = useSession();
const userPermissions =
  session?.user?.roles
    ?.map((role) => role.permissions.map((perm) => perm.name))
    ?.flat() || [];

// Pattern 2: Dari localStorage (untuk middleware/loader)
import { SessionUser } from "@/libs/localstorage";
const session = SessionUser.get();
const userPermissions =
  session?.user?.roles
    ?.map((role) => role.permissions.map((perm) => perm.name))
    ?.flat() || [];

// Pattern 3: Untuk route loader, menggunakan permission key dengan Set
const session = SessionUser.get();
const userPermissions = new Set(
  session?.user?.roles
    ?.flatMap((role) => role.permissions.map((p) => p.key)) || [],
);

// Pattern 4: Dengan type safety yang lebih baik
const userPermissions: string[] =
  session?.user?.roles
    ?.map((role) => role.permissions.map((perm: { name: string }) => perm.name))
    ?.flat() || [];
```

**Catatan Penting**:
- Gunakan `perm.name` untuk Guard component, middleware, sidebar filtering
- Gunakan `perm.key` untuk route loader permission check
- Gunakan `Set` untuk performa yang lebih baik saat check dengan `.has()`

---

## Route-Level Permission

Route-level permission menggunakan **route loader** yang check permission sebelum page di-load.

### Implementation

**File**: `src/libs/react-router/handlers/loader-action.ts`

```typescript
import { ActionFunction, LoaderFunction } from "react-router";
import { PageModuleExports } from "../types/route";
import { withMiddleware } from "../utils/middleware";
import { SessionUser } from "../../localstorage";

/**
 * Creates a loader function for a route that first checks permissions via middleware.
 * 
 * Permission Format Support:
 * 1. string[] -> AND logic (semua permission harus ada)
 * 2. string[][] -> OR of ANDs (salah satu group harus terpenuhi, dalam group semua harus terpenuhi)
 */
export function createLoaderFunction(importer: () => Promise<unknown>): LoaderFunction {
  return withMiddleware(async (middlewareArgs) => {
    const pageModule = (await importer()) as PageModuleExports;
    
    if (pageModule.permissions && pageModule.permissions.length > 0) {
      const session = SessionUser.get();
      const userPermissions = new Set(
        session?.user?.roles
          ?.flatMap((role) => role.permissions.map((p) => p.key)) || [],
      );

      const requiredPermissions = pageModule.permissions;
      let hasPermission = false;

      // Check if it's 2D array (OR of ANDs)
      if (
        requiredPermissions.length > 0 &&
        Array.isArray(requiredPermissions[0])
      ) {
        // permissions: string[][] -> OR logic for outer arrays
        // Each inner array is AND logic
        // Example: [[PERM1], [PERM2, PERM3]] 
        //          -> (PERM1) OR (PERM2 AND PERM3)
        const permissionGroups = requiredPermissions as string[][];
        hasPermission = permissionGroups.some((group) =>
          group.every((p) => userPermissions.has(p)),
        );
      } else {
        // permissions: string[] -> AND logic
        // Example: [PERM1, PERM2] -> PERM1 AND PERM2
        const permissions = requiredPermissions as string[];
        hasPermission = permissions.every((p) => userPermissions.has(p));
      }

      if (!hasPermission) {
        throw new Response("Forbidden", { status: 403 });
      }
    }

    return pageModule.loader?.(middlewareArgs);
  });
}
```

### Route Type Definition

**File**: `src/libs/react-router/types/route.tsx`

```typescript
export interface PageModuleExports {
  default: () => JSX.Element;
  permissions?: string[] | string[][];  // Support AND atau OR of ANDs
  loader?: LoaderFunction;
  action?: ActionFunction;
}
```

### Usage Example

**File**: `src/app/(protected)/iam/users/create/page.tsx`

```typescript
import { PERMISSIONS } from "@/commons/constants/permissions";

// Export permissions untuk route loader
// Format: string[] untuk AND logic
export const permissions = [PERMISSIONS.USERS.CREATE_USERS];

// Atau untuk OR of ANDs:
// export const permissions = [
//   [PERMISSIONS.ADMIN],  // Group 1: Admin
//   [PERMISSIONS.USERS.READ_USERS, PERMISSIONS.USERS.CREATE_USERS]  // Group 2: Read AND Create
// ];

export const Component = () => {
  // Component code here
  return <Page title="Create User">...</Page>;
};

export default Component;
```

**Catatan**:
- Permission check menggunakan `permission.key` (bukan `permission.name`)
- Jika permission tidak terpenuhi, throw `Response` dengan status 403
- Route loader akan prevent page dari loading jika permission tidak terpenuhi

---

## Component-Level Permission

Component-level permission menggunakan **Guard Component** untuk conditionally render component berdasarkan permission.

### Guard Component

**File**: `src/app/_components/guard/index.tsx`

```typescript
import { FC, Fragment, PropsWithChildren, ReactNode, useMemo } from "react";
import { useSession } from "../providers/session";

type TProps = PropsWithChildren<{
  permissions: Array<string>;  // AND logic - semua permission harus ada
  fallback?: ReactNode;         // Optional fallback jika permission tidak terpenuhi
}>;

/**
 * Guard Component untuk protect UI elements berdasarkan permission
 * Logic: AND - semua permission harus ada
 * 
 * @example
 * <Guard permissions={[PERMISSIONS.USERS.DELETE_USERS]} fallback={<></>}>
 *   <Button onClick={handleDelete}>Delete</Button>
 * </Guard>
 */
export const Guard: FC<TProps> = (props): ReactNode => {
  const { session } = useSession();

  const permissionKeys = useMemo(
    () =>
      session?.user?.roles
        ?.map((role) => role.permissions.map((perm) => perm.name))
        ?.flat() || [],
    [session?.user?.roles],
  );

  const allowed = useMemo(() => {
    // AND logic - semua permission harus ada
    return props.permissions.every((permission) => permissionKeys.includes(permission));
  }, [permissionKeys, props.permissions]);

  if (allowed) {
    return <Fragment>{props.children}</Fragment>;
  }

  return props.fallback || null;
};
```

### Usage Examples

**File**: `src/app/(protected)/iam/users/page.tsx`

```typescript
import { Guard } from "@/app/_components/guard";
import { PERMISSIONS } from "@/commons/constants/permissions";

export const Component = () => {
  return (
    <Page>
      <Datatable
        columns={[
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <Flex gap={8}>
                {/* Guard dengan fallback empty */}
                <Guard permissions={[PERMISSIONS.USERS.DELETE_USERS]} fallback={<></>}>
                  <Button 
                    icon={<DeleteOutlined />} 
                    danger
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </Button>
                </Guard>

                {/* Guard dengan fallback null */}
                <Guard permissions={[PERMISSIONS.USERS.UPDATE_USERS]} fallback={null}>
                  <Button 
                    icon={<EditOutlined />}
                    onClick={() => navigate(`/iam/users/${record.id}/update`)}
                  >
                    Edit
                  </Button>
                </Guard>

                {/* Guard tanpa fallback (default null) */}
                <Guard permissions={[PERMISSIONS.USERS.READ_USERS]}>
                  <Button 
                    icon={<EyeOutlined />}
                    onClick={() => navigate(`/iam/users/${record.id}/detail`)}
                  >
                    View
                  </Button>
                </Guard>
              </Flex>
            ),
          },
        ]}
      />

      {/* Guard untuk button di luar table */}
      <Guard permissions={[PERMISSIONS.USERS.CREATE_USERS]} fallback={<></>}>
        <Button 
          type="primary" 
          icon={<PlusCircleOutlined />}
          onClick={() => navigate("/iam/users/create")}
        >
          Create User
        </Button>
      </Guard>
    </Page>
  );
};
```

**Catatan**:
- Guard menggunakan `permission.name` untuk check (bukan `permission.key`)
- Logic: **AND** - semua permission di array harus ada
- Jika permission tidak terpenuhi, render `fallback` atau `null`
- Menggunakan `useMemo` untuk optimize re-render

---

## Middleware-Level Permission

Middleware-level permission untuk protect routes secara global sebelum masuk ke route handler.

### Implementation

**File**: `src/middleware.ts`

```typescript
import { ROUTES } from "./commons/constants/routes";
import { PERMISSIONS } from "./commons/constants/permissions";
import { registerMiddleware } from "./libs/react-router";
import { SessionUser } from "./libs/localstorage";
import { filterPermission } from "./utils/permission";

// Mapping route dengan permission requirements
const mappingRoutePermissions = [
  { path: ROUTES.dashboard },  // No permission required
  { path: ROUTES.iam.users.list, permissions: [PERMISSIONS.USERS.READ_USERS] },
  { path: ROUTES.iam.roles.list, permissions: [PERMISSIONS.ROLES.READ_ROLES] },
  // Add more routes here
];

const mappingPublicRoutes = [ROUTES.auth.login, ROUTES.auth.callback];

// Root redirect middleware
registerMiddleware({
  matcher: "^/$",
  handler: () => {
    const session = SessionUser.get();
    if (session) {
      return { redirect: ROUTES.dashboard };
    }
    return { redirect: ROUTES.auth.login };
  },
});

// Global permission check middleware
registerMiddleware({
  matcher: ".*",
  handler: (request) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const session = SessionUser.get();

    // Check if route is public
    const isPublicRoute = mappingPublicRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

    // Redirect to login if not authenticated and not public route
    if (!isPublicRoute && !session) {
      const redirectTo = `${ROUTES.auth.login}?redirect=${encodeURIComponent(pathname)}`;
      return { redirect: redirectTo };
    }

    // Redirect to dashboard if authenticated and trying to access public route
    if (isPublicRoute && session) {
      return { redirect: ROUTES.dashboard };
    }

    // Permission check for protected routes
    if (session) {
      const userPermissions: string[] =
        session?.user?.roles
          ?.map((role) => role.permissions.map((perm: { name: string }) => perm.name))
          ?.flat() || [];

      // Find permission rules for current path
      const rulesForPath = mappingRoutePermissions.filter((rule) => rule.path === pathname);
      
      // Filter allowed rules based on user permissions
      const allowedRules = filterPermission(rulesForPath, (rule) => {
        // If no permission required, allow access
        if (!rule.permissions || rule.permissions.length === 0) return true;
        // OR logic - salah satu permission cukup
        return rule.permissions.some((perm) => userPermissions.includes(perm));
      });

      // If route has permission rules but none match, redirect to dashboard
      if (rulesForPath.length > 0 && allowedRules.length === 0) {
        return { redirect: ROUTES.dashboard };
      }
    }

    return; // Allow access
  },
});
```

**Catatan**:
- Middleware menggunakan `permission.name` untuk check
- Logic: **OR** - salah satu permission di array cukup (menggunakan `.some()`)
- Route tanpa permission rules dianggap public (allow access)
- Menggunakan `filterPermission` untuk support nested structure jika diperlukan

---

## Sidebar/Menu Permission Filtering

Sidebar menu filtering untuk hide/show menu items berdasarkan permission user.

### Sidebar Item Type

**File**: `src/commons/constants/sidebar.tsx`

```typescript
import { Link } from "react-router";
import { PERMISSIONS } from "./permissions";
import { ReactNode } from "react";

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  icon: ReactNode;
  permissions?: string[];  // Optional - jika undefined berarti public menu
  children?: TSidebarItem[];  // Support nested menu
};

export const SIDEBAR_ITEMS: TSidebarItem[] = [
  {
    key: "dashboard",
    label: <Link to="/dashboard">Dashboard</Link>,
    icon: <DashboardFilled />,
    // No permissions = public menu (selalu visible jika user authenticated)
  },
  {
    key: "users",
    label: "IAM",
    icon: <UserOutlined />,
    permissions: [PERMISSIONS.USERS.READ_USERS],  // Parent permission
    children: [
      {
        key: ROUTES.iam.users.list,
        label: <Link to={ROUTES.iam.users.list}>User</Link>,
        permissions: [PERMISSIONS.USERS.READ_USERS],
        icon: <UserOutlined />,
      },
      {
        key: ROUTES.iam.roles.list,
        label: <Link to={ROUTES.iam.roles.list}>Role</Link>,
        permissions: [PERMISSIONS.ROLES.READ_ROLES],
        icon: <UserOutlined />,
      },
      {
        key: ROUTES.iam.permissions.list,
        label: <Link to={ROUTES.iam.permissions.list}>Permission</Link>,
        permissions: [PERMISSIONS.PERMISSIONS.READ_PERMISSIONS],
        icon: <UserOutlined />,
      },
    ],
  },
];
```

### Layout Implementation

**File**: `src/app/(protected)/layout.tsx`

```typescript
import type { FC, ReactElement } from "react";
import { LayoutWithHeader } from "admiral";
import { Outlet } from "react-router";
import { SIDEBAR_ITEMS } from "@/commons/constants/sidebar";
import { filterPermission } from "@/utils/permission";
import { useSession } from "../_components/providers/session";

const ProtectedLayout: FC = (): ReactElement => {
  const { session } = useSession();
  
  // Extract user permissions from session
  const userPermissions =
    session?.user?.roles
      ?.map((role) => role.permissions?.map((perm) => perm.name))
      .flat() || [];

  // Filter sidebar items based on permissions
  // Logic: OR - salah satu permission cukup, atau no permission = public
  const filteredItems = filterPermission(
    SIDEBAR_ITEMS,
    (item) =>
      item.permissions === undefined ||
      item.permissions.some((permission) => userPermissions.includes(permission)),
  );

  return (
    <LayoutWithHeader
      header={{
        brandLogo: <Typography.Title>Vite Admiral</Typography.Title>,
      }}
      sidebar={{
        width: 250,
        menu: filteredItems,
        theme: "light",
      }}
    >
      <Outlet />
    </LayoutWithHeader>
  );
};

export default ProtectedLayout;
```

**Catatan**:
- Menggunakan `filterPermission` untuk support nested menu dengan recursive filtering
- Logic: **OR** - salah satu permission cukup (menggunakan `.some()`)
- Menu tanpa `permissions` property dianggap public (selalu visible)
- Parent menu akan tetap visible jika ada children yang ter-filter dan memiliki permission

---

## Pattern Summary

### Permission Logic Types

| Logic Type | Format | Usage | Example |
|------------|--------|-------|---------|
| **AND** | `string[]` | Route loader, Guard component | `[PERM1, PERM2]` → PERM1 AND PERM2 |
| **OR of ANDs** | `string[][]` | Route loader (complex) | `[[PERM1], [PERM2, PERM3]]` → (PERM1) OR (PERM2 AND PERM3) |
| **OR** | `string[]` dengan `.some()` | Middleware, Sidebar | `[PERM1, PERM2]` → PERM1 OR PERM2 |

### Permission Field Usage

| Field | Usage | Example Value | Where Used |
|-------|-------|---------------|------------|
| `permission.name` | Permission check untuk UI | `"READ USERS"` | Guard component, Middleware, Sidebar |
| `permission.key` | Permission check untuk route | `"read-users"` | Route loader |

### User Permissions Extraction Pattern

**Standard Pattern**:
```typescript
// Menggunakan permission.name
const userPermissions =
  session?.user?.roles
    ?.map((role) => role.permissions.map((perm) => perm.name))
    ?.flat() || [];

// Menggunakan permission.key (untuk route loader dengan Set)
const userPermissions = new Set(
  session?.user?.roles
    ?.flatMap((role) => role.permissions.map((p) => p.key)) || [],
);
```

### Permission Check Patterns

**1. AND Logic Check**:
```typescript
// Semua permission harus ada
const hasPermission = requiredPermissions.every((p) => userPermissions.includes(p));
```

**2. OR Logic Check**:
```typescript
// Salah satu permission cukup
const hasPermission = requiredPermissions.some((p) => userPermissions.includes(p));
```

**3. OR of ANDs Check**:
```typescript
// Salah satu group terpenuhi, dalam group semua harus ada
const hasPermission = permissionGroups.some((group) =>
  group.every((p) => userPermissions.has(p))
);
```

### Complete Permission Flow

```
1. User Login
   ↓
2. Session stored dengan user.roles[].permissions[]
   ↓
3. Middleware Check (global route protection)
   ├─ Check authentication
   ├─ Check route permissions (OR logic)
   └─ Redirect if no permission
   ↓
4. Route Loader Check (page-level)
   ├─ Check page module permissions (AND atau OR of ANDs)
   ├─ Use permission.key
   └─ Throw 403 if no permission
   ↓
5. Page Render
   ├─ Sidebar filtered (OR logic)
   └─ Guard components check (AND logic)
```

---

## Vue Implementation Guide

Untuk implementasi di Vue.js, berikut adalah adaptasi pattern:

### 1. Permission Constants (Same)

```typescript
// src/constants/permissions.ts
export const PERMISSIONS = {
  USERS: {
    READ_USERS: "READ USERS",
    CREATE_USERS: "CREATE USERS",
    UPDATE_USERS: "UPDATE USERS",
    DELETE_USERS: "DELETE USERS",
  },
  // ... more
};
```

### 2. Utility Functions (Vue Composable)

```typescript
// src/composables/usePermission.ts
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

export function usePermission() {
  const authStore = useAuthStore();
  
  const userPermissions = computed(() => {
    return authStore.user?.roles
      ?.flatMap(role => role.permissions.map(perm => perm.name)) || [];
  });

  const hasPermission = (permissions: string[], logic: 'AND' | 'OR' = 'AND') => {
    if (logic === 'AND') {
      return permissions.every(p => userPermissions.value.includes(p));
    } else {
      return permissions.some(p => userPermissions.value.includes(p));
    }
  };

  const filterPermission = <T extends { permissions?: string[]; children?: T[] }>(
    items: T[],
    callback: (item: T) => boolean
  ): T[] => {
    return items.reduce((all, item) => {
      if (item.children && item.children.length > 0) {
        const children = filterPermission(item.children, callback);
        if (children.length > 0) {
          all.push({ ...item, children });
        }
      } else if (callback(item)) {
        all.push(item);
      }
      return all;
    }, [] as T[]);
  };

  return {
    userPermissions,
    hasPermission,
    filterPermission,
  };
}
```

### 3. Route-Level Permission (Vue Router Guards)

```typescript
// src/router/guards.ts
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { PERMISSIONS } from '@/constants/permissions';

// Route meta definition
declare module 'vue-router' {
  interface RouteMeta {
    permissions?: string[] | string[][];
    requiresAuth?: boolean;
  }
}

export function permissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();
  
  // Check authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } });
  }

  // Check permissions
  if (to.meta.permissions && to.meta.permissions.length > 0) {
    const userPermissions = new Set(
      authStore.user?.roles
        ?.flatMap(role => role.permissions.map(p => p.key)) || []
    );

    const requiredPermissions = to.meta.permissions;
    let hasPermission = false;

    // OR of ANDs
    if (Array.isArray(requiredPermissions[0])) {
      const groups = requiredPermissions as string[][];
      hasPermission = groups.some(group =>
        group.every(p => userPermissions.has(p))
      );
    } else {
      // AND logic
      const permissions = requiredPermissions as string[];
      hasPermission = permissions.every(p => userPermissions.has(p));
    }

    if (!hasPermission) {
      return next({ name: 'forbidden' });
    }
  }

  next();
}
```

### 4. Component-Level Permission (Vue Directive atau Component)

```vue
<!-- src/components/PermissionGuard.vue -->
<template>
  <slot v-if="allowed" />
  <template v-else-if="$slots.fallback">
    <slot name="fallback" />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePermission } from '@/composables/usePermission';

interface Props {
  permissions: string[];
  logic?: 'AND' | 'OR';
}

const props = withDefaults(defineProps<Props>(), {
  logic: 'AND',
});

const { hasPermission } = usePermission();

const allowed = computed(() => hasPermission(props.permissions, props.logic));
</script>
```

**Usage**:
```vue
<template>
  <PermissionGuard :permissions="[PERMISSIONS.USERS.DELETE_USERS]">
    <button @click="handleDelete">Delete</button>
    <template #fallback>
      <!-- Hidden by default -->
    </template>
  </PermissionGuard>
</template>
```

### 5. Sidebar Filtering (Vue)

```vue
<!-- src/layouts/ProtectedLayout.vue -->
<template>
  <div class="layout">
    <aside>
      <nav>
        <menu-item
          v-for="item in filteredMenuItems"
          :key="item.key"
          :item="item"
        />
      </nav>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePermission } from '@/composables/usePermission';
import { MENU_ITEMS } from '@/constants/menu';

const { filterPermission, userPermissions } = usePermission();

const filteredMenuItems = computed(() => {
  return filterPermission(MENU_ITEMS, (item) => {
    return !item.permissions || 
           item.permissions.some(perm => userPermissions.value.includes(perm));
  });
});
</script>
```

### 6. Vue Directive Alternative (Advanced)

```typescript
// src/directives/permission.ts
import { DirectiveBinding, VNode } from 'vue';
import { usePermission } from '@/composables/usePermission';

export const vPermission = {
  mounted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const { hasPermission } = usePermission();
    const permissions = binding.value;
    const logic = binding.modifiers.or ? 'OR' : 'AND';

    if (!hasPermission(permissions, logic)) {
      el.style.display = 'none';
      // atau remove element
      // el.parentNode?.removeChild(el);
    }
  },
};

// Usage:
// <button v-permission="[PERMISSIONS.USERS.DELETE_USERS]">Delete</button>
// <button v-permission.or="[PERM1, PERM2]">Action (OR logic)</button>
```

---

## Best Practices

### 1. Naming Convention
- Permission constants: `{MODULE}_{ACTION}_{RESOURCE}`
- Example: `READ_USERS`, `CREATE_ROLES`, `DELETE_PERMISSIONS`

### 2. Permission Granularity
- Lebih baik terlalu granular daripada terlalu broad
- Separate READ, CREATE, UPDATE, DELETE untuk setiap resource

### 3. Default Behavior
- Route tanpa permission = public (accessible)
- Menu tanpa permission = public (visible untuk authenticated users)
- Guard tanpa fallback = null (hidden)

### 4. Performance
- Gunakan `Set` untuk permission check di route loader (frequent checks)
- Gunakan `useMemo`/`computed` untuk permission extraction
- Cache user permissions di store/context

### 5. Error Handling
- Route permission: Throw 403 response
- Component permission: Hide UI (don't show error)
- Middleware: Redirect to safe route

### 6. Testing
- Test permission logic dengan berbagai kombinasi
- Test edge cases: no permissions, empty arrays, nested structures
- Test dengan multiple roles dan overlapping permissions

---

## Common Patterns & Examples

### Pattern 1: Page dengan Multiple Permissions (AND)

```typescript
// User list page: butuh READ permission
export const permissions = [PERMISSIONS.USERS.READ_USERS];

// User create page: butuh CREATE permission
export const permissions = [PERMISSIONS.USERS.CREATE_USERS];

// Admin page: butuh ADMIN role atau multiple permissions
export const permissions = [[PERMISSIONS.ADMIN], [PERMISSIONS.USERS.READ_USERS, PERMISSIONS.USERS.CREATE_USERS]];
```

### Pattern 2: Button dengan Conditional Permission

```tsx
// Delete button: hanya visible jika punya DELETE permission
<Guard permissions={[PERMISSIONS.USERS.DELETE_USERS]} fallback={<></>}>
  <Button danger onClick={handleDelete}>Delete</Button>
</Guard>

// Edit button: hanya visible jika punya UPDATE permission
<Guard permissions={[PERMISSIONS.USERS.UPDATE_USERS]} fallback={<></>}>
  <Button onClick={handleEdit}>Edit</Button>
</Guard>
```

### Pattern 3: Nested Menu dengan Permissions

```typescript
const MENU_ITEMS = [
  {
    key: "iam",
    label: "IAM",
    permissions: [PERMISSIONS.USERS.READ_USERS], // Parent permission
    children: [
      {
        key: "users",
        label: "Users",
        permissions: [PERMISSIONS.USERS.READ_USERS], // Child permission
      },
      {
        key: "roles",
        label: "Roles",
        permissions: [PERMISSIONS.ROLES.READ_ROLES], // Different permission
      },
    ],
  },
];
```

### Pattern 4: Complex Permission Logic (OR of ANDs)

```typescript
// Admin bisa akses, atau user dengan READ + CREATE permission
export const permissions = [
  [PERMISSIONS.ADMIN],
  [PERMISSIONS.USERS.READ_USERS, PERMISSIONS.USERS.CREATE_USERS]
];

// Logic: (ADMIN) OR (READ_USERS AND CREATE_USERS)
```

---

## Troubleshooting

### Issue 1: Permission check tidak bekerja

**Checklist**:
- [ ] User session sudah ter-set dengan roles dan permissions?
- [ ] Permission name/key sudah sesuai dengan yang di-define?
- [ ] Menggunakan field yang benar (`name` vs `key`)?
- [ ] Logic sudah sesuai (AND vs OR)?

### Issue 2: Route permission tidak ter-check

**Solution**:
- Pastikan route menggunakan `createLoaderFunction`
- Pastikan page module export `permissions`
- Check route loader implementation

### Issue 3: Guard component tidak hide/show

**Solution**:
- Check session provider sudah wrap component tree
- Verify permission names sesuai dengan constants
- Check console untuk error di permission extraction

### Issue 4: Sidebar menu tidak ter-filter

**Solution**:
- Verify `filterPermission` dipanggil dengan benar
- Check permission extraction dari session
- Verify callback function logic

---

## File Structure Reference

```
src/
├── commons/
│   └── constants/
│       ├── permissions.ts          # Permission constants
│       └── sidebar.tsx             # Sidebar menu definition
├── utils/
│   ├── permission.ts               # checkPermission, filterPermission
│   └── has-common-element.ts       # Helper function
├── libs/
│   └── react-router/
│       ├── handlers/
│       │   └── loader-action.ts    # Route loader with permission
│       └── types/
│           └── route.tsx           # PageModuleExports type
├── middleware.ts                   # Global route middleware
└── app/
    ├── _components/
    │   └── guard/
    │       └── index.tsx           # Guard component
    └── (protected)/
        └── layout.tsx              # Layout dengan sidebar filtering
```

---

## Conclusion

Permission system ini menggunakan multi-layer protection:
1. **Middleware**: Global route protection
2. **Route Loader**: Page-level protection
3. **Guard Component**: UI element protection
4. **Sidebar Filter**: Menu visibility control

Semua layer menggunakan pattern yang konsisten dengan utility functions yang reusable. Permission check menggunakan `name` untuk UI components dan `key` untuk route loader.

Untuk implementasi di Vue, pattern yang sama bisa diadaptasi menggunakan Vue Router guards, composables, dan components.

---

**Last Updated**: 2024
**Version**: 1.0
**Framework**: React (original), Vue (adaptation guide included)
