import { setupWorker } from 'msw/browser'
import { candidateHandlers } from '@/handler/candidate/api'
import { cvHandlers } from '@/handler/cv/api'

const worker = setupWorker(
  ...cvHandlers,
  ...candidateHandlers,
)

export async function setupMockBrowser () {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}
