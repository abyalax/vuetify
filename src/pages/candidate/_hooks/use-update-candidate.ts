import type { AxiosError } from 'axios'
import type { FormDataCandidate } from '../_components/form/candidate-schema'
import type { TResponseError } from '@/common/meta'
import { useMutation } from '@tanstack/vue-query'
import { QueryKey } from '@/common/query-key'
import { useNotification } from '@/components/hooks/use-notifications'
import { candidateApi } from '@/modules/candidate'

export function useUpdateCandidate (id: string) {
  const { back } = useRouter()
  const { notify } = useNotification()
  return useMutation({
    mutationKey: [QueryKey.CANDIDATE.UPDATE],
    mutationFn: (payload: FormDataCandidate) => candidateApi.update(id, payload),
    meta: { invalidateQueries: [QueryKey.CANDIDATE.GET_LIST] },
    onSuccess: () => {
      notify.success('Successfully update candidate')
      back()
    },
    onError: (error: AxiosError<TResponseError>) => {
      const message = error.response?.data.message ?? 'Failed to update candidate'
      console.log('useUpdateCandidate error :', error)
      notify.error(message)
    },
  })
}
