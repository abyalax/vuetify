import { setupWorker } from 'msw/browser'
import { authHandler } from '@/handler/auth'
import { candidateHandlers } from '@/handler/candidate/api'
import { cvHandlers } from '@/handler/cv/api'
import { jobPostHandlers } from '@/handler/job-post/api'
import { userHandlers } from '@/handler/user/api'

const worker = setupWorker(
  ...cvHandlers,
  ...candidateHandlers,
  ...jobPostHandlers,
  ...userHandlers,
  ...authHandler,
)

export async function setupMockBrowser () {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}
