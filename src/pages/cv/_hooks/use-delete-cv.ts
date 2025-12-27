import type { AxiosError } from 'axios'
import type { TResponseError } from '@/common/meta'
import { useMutation } from '@tanstack/vue-query'
import { QueryKey } from '@/common/query-key'
import { useNotification } from '@/components/hooks/use-notifications'
import { cvApi } from '@/modules/cv'

export function useDeleteCV () {
  const { notify } = useNotification()
  return useMutation({
    mutationKey: [QueryKey.CV.DELETE],
    mutationFn: cvApi.delete,
    meta: { invalidateQueries: [QueryKey.CV.GET_LIST] },
    onSuccess: () => notify.success('Successfully delete cv'),
    onError: (error: AxiosError<TResponseError>) => {
      const message = error.response?.data.message ?? 'Failed to delete cv'
      console.log('useDeleteCV error :', error)
      notify.error(message)
    },
  })
}
