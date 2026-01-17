import { computed, ref } from 'vue'
import { dfsPostOrder, dfsPreOrder } from './dfs-algorithm'

export type MaterialData = {
  id: string
  server: string
  vendor_direct: string
  vendor_aggregator: string
  category: string
  sub_category: string
}

export type NestedGroup = {
  name: string
  number: string
  data: MaterialData
  children?: NestedGroup[]
}

export type ExpandedState = Record<string, boolean>

export type NodeMeta = {
  id: string
  depth: number
  rowspan: number
  isLeaf: boolean
  isExpanded: boolean
  parentId?: string
}

export type GroupNode = {
  nodeKey: string
  record: GroupRecord
  children?: GroupNode[]
}

export type GroupRecord = {
  id: string
  name: string
  number: string
  data: MaterialData
  children?: GroupRecord[]
}

export type RenderRow = {
  node: GroupNode
  meta: NodeMeta
  data: MaterialData
}

function computeNodeMeta (
  nodes: GroupNode[],
  expanded: ExpandedState,
): Map<string, NodeMeta> {
  const metaMap = new Map<string, NodeMeta>()

  for (const root of nodes) {
    dfsPostOrder(root, {
      getChildren: n => n.children,
      isExpanded: n => expanded[n.nodeKey] !== false,
      onVisit: node => {
        const isExpanded = expanded[node.nodeKey] !== false
        const children = node.children ?? []

        let rowspan = 1

        if (isExpanded && children.length > 0) {
          rowspan += children.reduce(
            (sum, c) => sum + (metaMap.get(c.nodeKey)?.rowspan ?? 0),
            0,
          )
        }

        metaMap.set(node.nodeKey, {
          id: node.nodeKey,
          rowspan,
          depth: 0,
          isLeaf: children.length === 0,
          isExpanded,
        })

        return rowspan
      },
    })
  }

  for (const root of nodes) {
    dfsPreOrder(root, {
      getChildren: n => n.children,
      isExpanded: n => expanded[n.nodeKey] !== false,
      onVisit: ({ node, depth, parent }) => {
        const meta = metaMap.get(node.nodeKey)!
        meta.depth = depth
        meta.parentId = parent?.nodeKey
      },
    })
  }

  return metaMap
}

function nestedGroupToRecord (
  group: NestedGroup,
  data: MaterialData,
  id: string,
): GroupRecord {
  return {
    id,
    name: group.name,
    number: group.number,
    data,
    children: group.children?.map(c =>
      nestedGroupToRecord(c, c.data, `${id}/${c.number}`),
    ),
  }
}

interface HasGroupProperty {
  children: NestedGroup[]
}

function buildGroupTree (
  items: HasGroupProperty[],
): GroupNode[] {
  const roots: GroupNode[] = []

  function buildNode (
    record: GroupRecord,
    path: string,
  ): GroupNode {
    const nodeKey = `${path}/${record.number}`

    return {
      nodeKey,
      record,
      children: record.children?.map(c =>
        buildNode(c, nodeKey),
      ),
    }
  }

  for (const item of items) {
    for (const child of item.children) {
      const rootRecord = nestedGroupToRecord(child, child.data, `root/${child.number}`)
      const rootNode = buildNode(rootRecord, 'root')
      roots.push(rootNode)
    }
  }

  return roots
}

function buildRenderRows (
  roots: GroupNode[],
  expanded: ExpandedState,
  maxDepth?: number,
): RenderRow[] {
  const metaMap = computeNodeMeta(roots, expanded)
  const rows: RenderRow[] = []

  for (const root of roots) {
    dfsPreOrder(root, {
      getChildren: n => n.children,
      isExpanded: n => expanded[n.nodeKey] !== false,
      onVisit: ({ node, depth }) => {
        if (maxDepth !== undefined && depth > maxDepth) {
          return
        }
        rows.push({
          node,
          meta: metaMap.get(node.nodeKey)!,
          data: node.record.data,
        })
      },
    })
  }

  return rows
}

/* ======================
 * COMPOSABLE
 * ====================== */

export function useHierarchicalCellTable (
  data: HasGroupProperty[],
  options: { maxDepth?: number } = {},
) {
  const { maxDepth } = options
  const expanded = ref<ExpandedState>({})

  const groupRoots = computed(() =>
    buildGroupTree(data),
  )

  const rows = computed(() =>
    buildRenderRows(groupRoots.value, expanded.value, maxDepth),
  )

  function toggle (nodeKey: string) {
    expanded.value[nodeKey]
      = expanded.value[nodeKey] === false ? true : false
  }

  return {
    rows,
    expanded,
    toggle,
  }
}
