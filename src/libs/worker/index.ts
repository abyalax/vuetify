import { setupWorker } from 'msw/browser'
import { cvHandlers } from '@/handler/cv'

const worker = setupWorker(
  ...cvHandlers,
)

export async function setupMockBrowser () {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}
