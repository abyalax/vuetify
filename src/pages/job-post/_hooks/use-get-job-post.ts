import { useQuery } from '@tanstack/vue-query'
import { QueryKey } from '@/common/query-key'
import { jobPostApi } from '@/modules/job-post'

export function useGetJob (id: string) {
  return useQuery({
    queryKey: [QueryKey.CANDIDATE.GET],
    queryFn: () => jobPostApi.detail(id),
  })
}
