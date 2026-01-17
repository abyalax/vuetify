import { computed, ref } from 'vue'
import { dfsPostOrder, dfsPreOrder } from './dfs-algorithm'

export type NestedGroup = {
  name: string
  number: string
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

export type GroupNode<TData = any> = {
  nodeKey: string
  record: GroupRecord<TData>
  children?: GroupNode<TData>[]
}

export type GroupRecord<TData = any> = {
  id: string
  name: string
  number: string
  data: TData
  children?: GroupRecord<TData>[]
}

export type RenderRow<TData> = {
  node: GroupNode<TData>
  meta: NodeMeta
  data: TData
}

function computeNodeMeta<TData> (
  nodes: GroupNode<TData>[],
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
    dfsPreOrder<GroupNode<TData>, void>(root, {
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

function nestedGroupToRecord<TData> (
  group: NestedGroup,
  data: TData,
  id: string,
): GroupRecord<TData> {
  return {
    id,
    name: group.name,
    number: group.number,
    data,
    children: group.children?.map((c, idx) =>
      nestedGroupToRecord(
        c,
        data,
        `${id}/${c.number}-${idx}`,
      ),
    ),
  }
}

interface HasGroupProperty {
  group: NestedGroup
}

function buildGroupTree<TData extends HasGroupProperty> (
  items: TData[],
): GroupNode<TData>[] {
  return items.map(item => {
    const rootRecord = nestedGroupToRecord(
      item.group,
      item,
      `root/${(item as any).id || Math.random().toString(36)}`,
    )

    function buildNode (
      record: GroupRecord<TData>,
      path: string,
    ): GroupNode<TData> {
      const nodeKey = `${path}/${record.number}`

      return {
        nodeKey,
        record,
        children: record.children?.map(c =>
          buildNode(c, nodeKey),
        ),
      }
    }

    return buildNode(rootRecord, 'root')
  })
}

function buildRenderRows<TData> (
  roots: GroupNode<TData>[],
  expanded: ExpandedState,
): RenderRow<TData>[] {
  const metaMap = computeNodeMeta(roots, expanded)
  const rows: RenderRow<TData>[] = []

  for (const root of roots) {
    dfsPreOrder<GroupNode<TData>, void>(root, {
      getChildren: n => n.children,
      isExpanded: n => expanded[n.nodeKey] !== false,
      onVisit: ({ node }) => {
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

export function useHierarchicalCellTable<TData extends HasGroupProperty> (
  data: TData[],
) {
  const expanded = ref<ExpandedState>({})

  const groupRoots = computed(() =>
    buildGroupTree(data),
  )

  const rows = computed(() =>
    buildRenderRows(groupRoots.value, expanded.value),
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
