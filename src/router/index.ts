/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.beforeEach(to => {
  const auth = useAuthStore()

  const requiresAuth = to.matched.some(
    record => record.meta.requiresAuth === true,
  )

  if (requiresAuth && !auth.user) {
    auth.returnUrl = to.fullPath
    return {
      path: '/auth/login',
      query: { redirect: to.fullPath },
    }
  }

  if (auth.user && to.path === '/auth/login') {
    return auth.returnUrl ?? '/'
  }
})

router.beforeEach(() => {
  const uiStore = useUIStore()
  uiStore.isLoading = true
})

router.afterEach(() => {
  const uiStore = useUIStore()
  uiStore.isLoading = false
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
