import type { TFilterParams } from '@/common/meta'

export type DynamicCellTableProps<T> = {
  headers: readonly DynamicCellTableHeader<T & { rowKey: string }>[]
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

export type DynamicCellTableHeader = {
  title: string
  key: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  width?: number | string
}

export type TableColumn<T> = {
  key: keyof T | string
  label: string
  width?: number
  cellType?: 'text' | 'nested'
  getNestedValue?: (row: T) => NestedGroup
}
