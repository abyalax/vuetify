import type { AxiosError } from 'axios'
import type { TResponseError } from '@/common/meta'
import { useMutation } from '@tanstack/vue-query'
import { QueryKey } from '@/common/query-key'
import { useNotification } from '@/components/hooks/use-notifications'
import { jobPostApi } from '@/modules/job-post'

export function useDeleteJob () {
  const { notify } = useNotification()
  return useMutation({
    mutationKey: [QueryKey.JOB.DELETE],
    mutationFn: jobPostApi.delete,
    meta: { invalidateQueries: [QueryKey.JOB.GET_LIST] },
    onSuccess: () => notify.success('Successfully delete job'),
    onError: (error: AxiosError<TResponseError>) => {
      const message = error.response?.data.message ?? 'Failed to delete job'
      console.log('useDeleteJob error :', error)
      notify.error(message)
    },
  })
}
