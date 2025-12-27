import type { AxiosError } from 'axios'
import type { TResponseError } from '@/common/meta'
import { useMutation } from '@tanstack/vue-query'
import { QueryKey } from '@/common/query-key'
import { useNotification } from '@/components/hooks/use-notifications'
import { jobPostApi } from '@/modules/job-post'

export function useCreateJob () {
  const { back } = useRouter()
  const { notify } = useNotification()
  return useMutation({
    mutationKey: [QueryKey.JOB.CREATE],
    mutationFn: jobPostApi.create,
    meta: { invalidateQueries: [QueryKey.JOB.GET_LIST] },
    onSuccess: () => {
      notify.success('Successfully create job')
      back()
    },
    onError: (error: AxiosError<TResponseError>) => {
      const message = error.response?.data.message ?? 'Failed to create job'
      console.log('useCreateJob error :', error)
      notify.error(message)
    },
  })
}
