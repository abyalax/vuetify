import type { TableColumn } from '.'
// use-dynamic-cell-table.ts
import type { Material } from '@/types'

export function useDynamicCellTable () {
  const columns: TableColumn<Material>[] = [
    { key: 'server', label: 'Server' },

    {
      key: 'group',
      label: 'Group Name',
      cellType: 'nested',
      getNestedValue: row => row.group,
    },

    { key: 'vendor_direct', label: 'Vendor Direct' },
    { key: 'vendor_aggregator', label: 'Vendor Aggregator' },
    { key: 'category', label: 'Category' },
    { key: 'sub_category', label: 'Sub Category' },
  ]

  return { columns }
}
