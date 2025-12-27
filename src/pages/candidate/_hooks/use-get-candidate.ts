import { useQuery } from '@tanstack/vue-query'
import { QueryKey } from '@/common/query-key'
import { candidateApi } from '@/modules/candidate'

export function useGetCandidate (id: string) {
  return useQuery({
    queryKey: [QueryKey.CANDIDATE.GET_LIST],
    queryFn: () => candidateApi.detail(id),
  })
}
