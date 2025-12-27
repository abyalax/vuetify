import type { AxiosError } from 'axios'
import type { FormDataCV } from '../_components/form/cv-schema'
import type { TResponseError } from '@/common/meta'
import { useMutation } from '@tanstack/vue-query'
import { QueryKey } from '@/common/query-key'
import { useNotification } from '@/components/hooks/use-notifications'
import { cvApi } from '@/modules/cv'

export function useUpdateCV (id: string) {
  const { back } = useRouter()
  const { notify } = useNotification()
  return useMutation({
    mutationKey: [QueryKey.CV.UPDATE],
    mutationFn: (payload: FormDataCV) => cvApi.update(id, payload),
    meta: { invalidateQueries: [QueryKey.CV.GET_LIST] },
    onSuccess: () => {
      notify.success('Successfully update cv')
      back()
    },
    onError: (error: AxiosError<TResponseError>) => {
      const message = error.response?.data.message ?? 'Failed to update cv'
      console.log('useUpdateCV error :', error)
      notify.error(message)
    },
  })
}
