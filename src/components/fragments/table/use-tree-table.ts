import type { Ref } from 'vue'
import { computed, ref } from 'vue'

export type TreeNode<T> = T & {
  id: string
  children?: TreeNode<T>[]
}

export type FlattenNode<T> = T & {
  rowKey: string
  __level: number
  __parentKey?: string
  __isChild: boolean
}

function attachRowKey<T extends { id: string, children?: T[] }> (
  rows: T[],
  parentKey = '',
): (T & { rowKey: string, children?: T[] })[] {
  return rows.map(row => {
    const rowKey = parentKey ? `${parentKey}/${row.id}` : row.id

    return {
      ...row,
      rowKey,
      children: row.children
        ? attachRowKey(row.children, rowKey)
        : [],
    }
  })
}

export function useTreeTable<
  T extends { id: string, children?: T[] },
> (source: Ref<T[]>) {
  const expanded = ref<string[]>([])

  const toggleExpand = (rowKey: string) => {
    expanded.value = expanded.value.includes(rowKey)
      ? expanded.value.filter(v => v !== rowKey)
      : [...expanded.value, rowKey]
  }

  const treeData = computed(() =>
    attachRowKey<T>(source.value),
  )

  const flattenedItems = computed(() => {
    const result: FlattenNode<T>[] = []

    const walk = (
      nodes: (T & { rowKey: string })[],
      level = 0,
      parentKey?: string,
    ) => {
      for (const node of nodes) {
        result.push({
          ...node,
          __level: level,
          __parentKey: parentKey,
          __isChild: level > 0,
        })

        if (
          node.children?.length
          && expanded.value.includes(node.rowKey)
        ) {
          walk(node.children as any, level + 1, node.rowKey)
        }
      }
    }

    walk(treeData.value)
    return result
  })

  const isExpandableRow = (row: FlattenNode<T>) =>
    Array.isArray(row.children) && row.children.length > 0

  return {
    items: flattenedItems,
    expanded,
    toggleExpand,
    isExpandableRow,
  }
}
