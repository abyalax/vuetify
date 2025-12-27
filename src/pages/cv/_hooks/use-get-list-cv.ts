import type { Ref } from 'vue'
import type { TFilterParams } from '@/common/meta'
import { useQuery } from '@tanstack/vue-query'
import { computed, unref } from 'vue'
import { QueryKey } from '@/common/query-key'
import { cvApi } from '@/modules/cv'

export function useGetListCV (params: Ref<TFilterParams>) {
  // needed for reactivity
  const queryKey = computed(() => [
    QueryKey.CV.GET_LIST,
    { ...unref(params) },
  ])
  return useQuery({
    queryKey,
    queryFn: () => cvApi.list(params.value),
  })
}
