import type { NestedGroup } from './use-hierachical-cell-table'
import { reactive, ref, toRaw, watch } from 'vue'

type State = {
  id: string
  server: string
  vendor_direct: string
  vendor_aggregator: string
  category: string
  sub_category: string
  children: NestedGroup[]
}

type FlatRecord = {
  id: string
  record: any
}

/* =========================
 * CONFIG
 * ========================= */
const TRACKED_KEYS = [
  'server',
  'vendor_direct',
  'vendor_aggregator',
  'category',
  'sub_category',
] as const

/* =========================
 * UTILS
 * ========================= */
function isChanged (current: any, original: any): boolean {
  if (!current || !original) {
    return false
  }

  return TRACKED_KEYS.some(
    key => current[key] !== original[key],
  )
}

function flattenState (states: State[]): FlatRecord[] {
  const acc: FlatRecord[] = []

  for (const state of states) {
    if (state.id) {
      acc.push({ id: state.id, record: state })
    }
    if (state.children) {
      flattenNested(state.children, acc)
    }
  }

  return acc
}

function flattenNested (
  nodes: NestedGroup[],
  acc: FlatRecord[],
) {
  for (const node of nodes) {
    if (node.data?.id) {
      acc.push({ id: node.data.id, record: node.data })
    }
    if (node.children) {
      flattenNested(node.children, acc)
    }
  }
}

/* =========================
 * COMPOSABLE
 * ========================= */

export function useTableData (init: State[] = []) {
  const updated = ref(false)
  const submitted = ref(false)

  // IMPORTANT: clone first, then reactive
  const state = reactive<State[]>(
    structuredClone(init),
  )

  const originalState = ref<State[]>(
    structuredClone(init),
  )

  /* =========================
   * WATCHERS
   * ========================= */

  watch(
    state,
    () => {
      updated.value = true
    },
    { deep: true },
  )

  watch(submitted, val => {
    if (!val) {
      return
    }

    const payload = buildPayload(
      state,
      originalState.value,
    )

    console.log('Submitting payload:', payload)

    // TODO: API call here

    // after success → refresh snapshot
    originalState.value = structuredClone(
      toRaw(state),
    )

    updated.value = false
    submitted.value = false
  })

  /* =========================
   * DIFF ENGINE
   * ========================= */

  function buildPayload (
    current: State[],
    original: State[],
  ) {
    const payload: { id: string, record: any }[] = []

    const currentFlat = flattenState(current)
    const originalFlat = flattenState(original)

    const originalMap = new Map(
      originalFlat.map(r => [r.id, r.record]),
    )

    for (const { id, record } of currentFlat) {
      const originalRecord = originalMap.get(id)
      if (
        originalRecord
        && isChanged(record, originalRecord)
      ) {
        payload.push({ id, record })
      }
    }

    return payload
  }

  return {
    state,
    updated,
    submitted,
  }
}
