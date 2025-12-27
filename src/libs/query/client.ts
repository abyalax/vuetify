import { MutationCache, QueryClient, type QueryClientConfig, type QueryKey } from '@tanstack/vue-query'
let browserQueryClient: QueryClient | undefined

declare module '@tanstack/vue-query' {
  interface Register {
    mutationMeta: {
      invalidateQueries: QueryKey
    }
  }
}

function makeQueryClient (config?: QueryClientConfig) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
      },
    },
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        if (mutation.meta?.invalidateQueries) {
          console.log('invalidateQueries:', mutation.meta.invalidateQueries)
          browserQueryClient?.invalidateQueries({
            queryKey: mutation.meta.invalidateQueries,
          })
        }
      },
    }),
    ...config,
  })
}

export function getQueryClient (config?: QueryClientConfig) {
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient(config)
  }
  return browserQueryClient
}
