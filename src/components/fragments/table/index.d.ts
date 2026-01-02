import type { TFilterParams } from '@/common/meta'

export type TreeTableProps<T> = {
  headers: readonly DataTableHeader<T & { rowKey: string }>[]
  items: T[]
  loading?: boolean
  totalItems: number
  pagination: TFilterParams<T>
}

export type UpdateOptionParams = {
  page: number
  itemsPerPage: number
  sortBy: { key: string, order: SortOrder }[]
}

export type TableHeader = {
  title: string
  key: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  width?: number | string
}
