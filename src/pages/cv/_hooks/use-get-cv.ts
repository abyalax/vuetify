import { useQuery } from '@tanstack/vue-query'
import { QueryKey } from '@/common/query-key'
import { cvApi } from '@/modules/cv'

export function useGetCV (id: string) {
  return useQuery({
    queryKey: [QueryKey.CV.GET_LIST],
    queryFn: () => cvApi.detail(id),
  })
}
