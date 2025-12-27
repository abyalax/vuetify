import type { TFilterParams } from '@/common/meta'
import { reactive } from 'vue'

export function useCVTableState (routeQuery?: Record<string, string>) {
  const state = reactive<TFilterParams>({
    page: routeQuery?.page ? Number(routeQuery.page) : 1,
    per_page: routeQuery?.per_page ? Number(routeQuery.per_page) : 10,
    search: routeQuery?.search || '',
    sort: routeQuery?.sort || '',
    order: (routeQuery?.order as 'ASC' | 'DESC') || 'ASC',
  })
  return { state }
}
