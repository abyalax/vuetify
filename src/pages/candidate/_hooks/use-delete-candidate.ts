import type { AxiosError } from 'axios'
import type { TResponseError } from '@/common/meta'
import { useMutation } from '@tanstack/vue-query'
import { QueryKey } from '@/common/query-key'
import { useNotification } from '@/components/hooks/use-notifications'
import { candidateApi } from '@/modules/candidate'

export function useDeleteCandidate () {
  const { notify } = useNotification()
  return useMutation({
    mutationKey: [QueryKey.CANDIDATE.DELETE],
    mutationFn: candidateApi.delete,
    meta: { invalidateQueries: [QueryKey.CANDIDATE.GET_LIST] },
    onSuccess: () => notify.success('Successfully delete candidate'),
    onError: (error: AxiosError<TResponseError>) => {
      const message = error.response?.data.message ?? 'Failed to delete candidate'
      console.log('useDeleteCandidate error :', error)
      notify.error(message)
    },
  })
}
