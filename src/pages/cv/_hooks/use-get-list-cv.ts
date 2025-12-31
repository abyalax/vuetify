import type { MaybeRef } from 'vue'
import type { TFilterParams } from '@/common/meta'
import { useQuery } from '@tanstack/vue-query'
import { computed, unref } from 'vue'
import { QueryKey } from '@/common/query-key'
import { cvApi } from '@/modules/cv'

export function useGetListCV (params: MaybeRef<TFilterParams>) {
  return useQuery({
    // needed computed for dependency graph
    queryKey: computed(() => [
      QueryKey.CV.GET_LIST,
      unref(params),
    ]),
    queryFn: () => cvApi.list(unref(params)),
  })
}
