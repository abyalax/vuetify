import type { Ref } from 'vue'
import type { TFilterParams } from '@/common/meta'
import { useQuery } from '@tanstack/vue-query'
import { computed, unref } from 'vue'
import { QueryKey } from '@/common/query-key'
import { candidateApi } from '@/modules/candidate'

export function useGetListCandidate (params: Ref<TFilterParams>) {
  // needed for reactivity
  const queryKey = computed(() => [
    QueryKey.CANDIDATE.GET_LIST,
    { ...unref(params) },
  ])
  return useQuery({
    queryKey,
    queryFn: () => candidateApi.list(params.value),
  })
}
