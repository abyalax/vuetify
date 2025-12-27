import type { Ref } from 'vue'
import type { TFilterParams } from '@/common/meta'
import { useQuery } from '@tanstack/vue-query'
import { computed, unref } from 'vue'
import { QueryKey } from '@/common/query-key'
import { jobPostApi } from '@/modules/job-post'

export function useGetListJob (params: Ref<TFilterParams>) {
  const queryKey = computed(() => [
    QueryKey.JOB.GET_LIST,
    { ...unref(params) },
  ])
  return useQuery({
    queryKey,
    queryFn: () => jobPostApi.list(params.value),
  })
}
