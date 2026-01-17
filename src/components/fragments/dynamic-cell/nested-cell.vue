<script setup lang="ts">
  import type { NestedGroup } from '@/types'
  import { ref } from 'vue'

  defineProps<{
    node: NestedGroup
    level?: number
  }>()

  const open = ref(true)
</script>

<template>
  <div class="nested-cell">
    <div
      class="nested-row"
      :style="{ paddingLeft: `${(level ?? 0) * 16}px` }"
    >
      <span
        v-if="node.children?.length"
        class="toggle"
        @click="open = !open"
      >
        {{ open ? '▼' : '▶' }}
      </span>

      <span class="label">
        {{ node.name }}
      </span>

      <span class="number">
        {{ node.number }}
      </span>
    </div>

    <div v-if="open">
      <NestedCell
        v-for="child in node.children"
        :key="child.number"
        :level="(level ?? 0) + 1"
        :node="child"
      />
    </div>
  </div>
</template>

<style scoped>
.nested-cell {
  display: flex;
  flex-direction: column;
}

.nested-row {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 28px;
}

.toggle {
  cursor: pointer;
  font-size: 12px;
}

.label {
  font-weight: 500;
}

.number {
  color: #6b7280;
  font-size: 12px;
}
</style>
