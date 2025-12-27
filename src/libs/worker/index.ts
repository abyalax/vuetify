import { setupWorker } from 'msw/browser'
import { candidateHandlers } from '@/handler/candidate/api'
import { cvHandlers } from '@/handler/cv/api'
import { jobPostHandlers } from '@/handler/job-post/api'

const worker = setupWorker(
  ...cvHandlers,
  ...candidateHandlers,
  ...jobPostHandlers,
)

export async function setupMockBrowser () {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}
