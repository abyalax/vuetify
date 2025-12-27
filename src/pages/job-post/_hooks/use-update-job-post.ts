import type { AxiosError } from 'axios'
import type { FormDataJobPost } from '../_components/form/job-schema'
import type { TResponseError } from '@/common/meta'
import { useMutation } from '@tanstack/vue-query'
import { QueryKey } from '@/common/query-key'
import { useNotification } from '@/components/hooks/use-notifications'
import { jobPostApi } from '@/modules/job-post'

export function useUpdateJob (id: string) {
  const { back } = useRouter()
  const { notify } = useNotification()
  return useMutation({
    mutationKey: [QueryKey.JOB.UPDATE],
    mutationFn: (payload: FormDataJobPost) => jobPostApi.update(id, payload),
    meta: { invalidateQueries: [QueryKey.JOB.GET_LIST] },
    onSuccess: () => {
      notify.success('Successfully update job')
      back()
    },
    onError: (error: AxiosError<TResponseError>) => {
      const message = error.response?.data.message ?? 'Failed to update job'
      console.log('useUpdateJob error :', error)
      notify.error(message)
    },
  })
}
