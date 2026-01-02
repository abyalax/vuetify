import type { Ref } from 'vue'
import type { TFilterParams } from '@/common/meta'
import { useQuery } from '@tanstack/vue-query'
import { computed, unref } from 'vue'
import { QueryKey } from '@/common/query-key'
import { jobPostApi } from '@/modules/job-post'

export function useGetListJob (params: Ref<TFilterParams>) {
  return useQuery({
    // needed computed for dependency graph
    queryKey: computed(() => [
      QueryKey.JOB.GET_LIST,
      unref(params),
    ]),
    queryFn: () => jobPostApi.list(params.value),
  })
}
