import type { AxiosError } from 'axios'
import type { TResponseError } from '@/common/meta'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { QueryKey } from '@/common/query-key'
import { useNotification } from '@/components/hooks/use-notifications'
import { cvApi } from '@/modules/cv'

export function useCreateCV () {
  const { back } = useRouter()
  const { notify } = useNotification()
  return useMutation({
    mutationKey: [QueryKey.CV.CREATE],
    mutationFn: cvApi.create,
    meta: { invalidateQueries: [QueryKey.CV.GET_LIST] },
    onSuccess: () => {
      notify.success('Successfully create cv')
      back()
    },
    onError: (error: AxiosError<TResponseError>) => {
      const message = error.response?.data.message ?? 'Failed to create cv'
      console.log('useCreateCV error :', error)
      notify.error(message)
    },
  })
}
