import type { AxiosError } from 'axios'
import type { TResponseError } from '@/common/meta'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { QueryKey } from '@/common/query-key'
import { useNotification } from '@/components/hooks/use-notifications'
import { candidateApi } from '@/modules/candidate'

export function useCreateCandidate () {
  const { back } = useRouter()
  const { notify } = useNotification()
  return useMutation({
    mutationKey: [QueryKey.CANDIDATE.CREATE],
    mutationFn: candidateApi.create,
    meta: { invalidateQueries: [QueryKey.CANDIDATE.GET_LIST] },
    onSuccess: () => {
      notify.success('Successfully create candidate')
      back()
    },
    onError: (error: AxiosError<TResponseError>) => {
      const message = error.response?.data.message ?? 'Failed to create candidate'
      console.log('useCreateCandidate error :', error)
      notify.error(message)
    },
  })
}
