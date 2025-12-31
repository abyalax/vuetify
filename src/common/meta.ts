import type { AxiosError } from 'axios'

type TMetaPage = {
  page?: number
  perPage?: number
}

export type TMetaResponse = TMetaPage & {
  pageSize?: number
  total?: number
}

export type SortOrder = 'asc' | 'desc'

export type TMetaRequest<T = unknown> = TMetaPage & {
  search?: string
  sort?: string
  order?: SortOrder
  orderBy?: string
  filters?: T
}

export type TFilterParams<T = Record<string, unknown>> = {
  page?: number
  per_page?: number
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
} & T

export type TResponseList<T> = {
  items: T[]
  meta: {
    page: number
    per_page: number
    total: number
    total_page: number
  }
}

export type TResponseData<T> = {
  status_code: number
  data: T
  version: string
  message: string
}

export type TResponseError = AxiosError<{
  status_code: number
  error_message: string
  stack_trace: string
  error?: string
  message?: string
  errors?: {
    key: string
    message: string
    path: string
    messages: string[]
  }[]
  version: string
}>
