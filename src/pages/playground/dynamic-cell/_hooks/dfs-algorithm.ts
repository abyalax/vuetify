type DFSPreOrderOption<TNode, TResult> = {
  getChildren: (node: TNode) => TNode[] | undefined
  isExpanded?: (node: TNode) => boolean
  onVisit: (ctx: {
    node: TNode
    depth: number
    parent?: TNode
  }) => TResult | void
}

export function dfsPreOrder<TNode, TResult> (
  node: TNode,
  options: DFSPreOrderOption<TNode, TResult>,
  ctx?: {
    depth?: number
    parent?: TNode
    result?: TResult[]
  },
): TResult[] {
  const {
    getChildren,
    isExpanded = () => true,
    onVisit,
  } = options

  const depth = ctx?.depth ?? 0
  const parent = ctx?.parent
  const result = ctx?.result ?? []

  const visitResult = onVisit({ node, depth, parent })
  if (visitResult !== undefined) {
    result.push(visitResult)
  }

  const children = getChildren(node)
  if (children && isExpanded(node)) {
    for (const child of children) {
      dfsPreOrder(child, options, {
        depth: depth + 1,
        parent: node,
        result,
      })
    }
  }

  return result
}

type DFSPostOrderOption<TNode> = {
  getChildren: (node: TNode) => TNode[] | undefined
  isExpanded?: (node: TNode) => boolean
  onVisit: (node: TNode) => number
}

export function dfsPostOrder<TNode> (
  node: TNode,
  options: DFSPostOrderOption<TNode>,
): number {
  const {
    getChildren,
    isExpanded = () => true,
    onVisit,
  } = options

  const children = getChildren(node)
  let acc = 0

  if (children && isExpanded(node)) {
    for (const child of children) {
      acc += dfsPostOrder(child, options)
    }
  }

  return onVisit(node) || acc || 1
}
