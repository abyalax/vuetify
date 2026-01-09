/**
 * router/index.ts
 *
 * Manual routes configuration
 */

import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { PERMISSION } from '@/common/permission'
import AuthenticatedLayout from '@/layouts/authenticated.vue'
import Blank from '@/layouts/blank/blank.vue'
import Error403Page from '@/pages/403.vue'
import Error404Page from '@/pages/404.vue'
import Error500Page from '@/pages/500.vue'
import LoginPage from '@/pages/auth/login.vue'
import RegisterPage from '@/pages/auth/register.vue'
import CandidateDetailPage from '@/pages/candidates/[id]/index.vue'
import CandidateUpdatePage from '@/pages/candidates/[id]/update/index.vue'
import CandidateCreatePage from '@/pages/candidates/create/index.vue'
import CandidatesPage from '@/pages/candidates/index.vue'
import CVDetailPage from '@/pages/cv/[id]/index.vue'
import CVUpdatePage from '@/pages/cv/[id]/update/index.vue'
import CVCreatePage from '@/pages/cv/create/index.vue'
import CVPage from '@/pages/cv/index.vue'
import DashboardPage from '@/pages/dashboard/index.vue'
import IndexPage from '@/pages/index.vue'
import JobPostNestedDetailPage from '@/pages/job-post-nested/[id]/index.vue'
import JobPostNestedUpdatePage from '@/pages/job-post-nested/[id]/update/index.vue'
import JobPostNestedCreatePage from '@/pages/job-post-nested/create/index.vue'
import JobPostNestedPage from '@/pages/job-post-nested/index.vue'
import JobPostDetailPage from '@/pages/job-post/[id]/index.vue'
import JobPostUpdatePage from '@/pages/job-post/[id]/update/index.vue'
import JobPostCreatePage from '@/pages/job-post/create/index.vue'
import JobPostPage from '@/pages/job-post/index.vue'
import PlaygroundPage from '@/pages/playground/index.vue'
import { authGuard } from '@/stores/auth'
import { useUIStore } from '@/stores/ui-store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Blank,
    children: [
      {
        path: '',
        name: 'index',
        component: IndexPage,
      },
      {
        path: 'auth/login',
        name: 'auth-login',
        component: LoginPage,
      },
      {
        path: 'auth/register',
        name: 'auth-register',
        component: RegisterPage,
      },
      {
        path: '403',
        name: '403',
        component: Error403Page,
      },
      {
        path: '404',
        name: '404',
        component: Error404Page,
      },
      {
        path: '500',
        name: '500',
        component: Error500Page,
      },
    ],
  },
  {
    path: '/',
    component: AuthenticatedLayout,
    meta: {
      requiresAuth: true,
      // No permissions on parent - check individual child routes
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardPage,
        meta: {
          requiresAuth: true,
          // Dashboard is accessible to all authenticated users
        },
      },
      {
        path: 'candidates',
        name: 'candidates',
        component: CandidatesPage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.candidate_read],
        },
      },
      {
        path: 'candidates/create',
        name: 'candidates-create',
        component: CandidateCreatePage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.candidate_write],
        },
      },
      {
        path: 'candidates/:id',
        name: 'candidates-detail',
        component: CandidateDetailPage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.candidate_read],
        },
      },
      {
        path: 'candidates/:id/update',
        name: 'candidates-update',
        component: CandidateUpdatePage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.candidate_update],
        },
      },
      {
        path: 'cv',
        name: 'cv',
        component: CVPage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.cv_read],
        },
      },
      {
        path: 'cv/create',
        name: 'cv-create',
        component: CVCreatePage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.cv_write],
        },
      },
      {
        path: 'cv/:id',
        name: 'cv-detail',
        component: CVDetailPage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.cv_read],
        },
      },
      {
        path: 'cv/:id/update',
        name: 'cv-update',
        component: CVUpdatePage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.cv_update],
        },
      },
      {
        path: 'job-post',
        name: 'job-post',
        component: JobPostPage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.job_read],
        },
      },
      {
        path: 'job-post/create',
        name: 'job-post-create',
        component: JobPostCreatePage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.job_write],
        },
      },
      {
        path: 'job-post/:id',
        name: 'job-post-detail',
        component: JobPostDetailPage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.job_read],
        },
      },
      {
        path: 'job-post/:id/update',
        name: 'job-post-update',
        component: JobPostUpdatePage,
        meta: {
          requiresAuth: true,
          permissions: [PERMISSION.ADMIN.job_update],
        },
      },
      {
        path: 'job-post-nested',
        name: 'job-post-nested',
        component: JobPostNestedPage,
      },
      {
        path: 'job-post-nested/create',
        name: 'job-post-nested-create',
        component: JobPostNestedCreatePage,
      },
      {
        path: 'job-post-nested/:id',
        name: 'job-post-nested-detail',
        component: JobPostNestedDetailPage,
      },
      {
        path: 'job-post-nested/:id/update',
        name: 'job-post-nested-update',
        component: JobPostNestedUpdatePage,
      },
    ],
  },
  {
    path: '/',
    component: AuthenticatedLayout,
    meta: {
      requiresAuth: true,
      permissions: [
        PERMISSION.CANDIDATE.PLAYGROUND,
      ],
    },
    children: [
      {
        path: 'playground',
        name: 'playground',
        component: PlaygroundPage,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: Blank,
    children: [
      {
        path: '',
        name: 'not-found',
        component: Error404Page,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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

router.beforeEach(authGuard)

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
