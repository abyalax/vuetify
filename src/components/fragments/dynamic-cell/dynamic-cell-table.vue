<script setup lang="ts" generic="T extends { id: string }">
  import type { TableColumn } from './index'
  import NestedCell from './nested-cell.vue'

  defineProps<{
    columns: TableColumn<T>[]
    rows: T[]
  }>()
</script>
<template>
  <v-table class="dynamic-table">
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">
          {{ col.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="col in columns" :key="col.key">
          <!-- NESTED CELL -->
          <NestedCell
            v-if="col.cellType === 'nested'"
            :node="col.getNestedValue?.(row)"
          />

          <!-- NORMAL CELL -->
          <span v-else>
            {{ (row as any)[col.key] }}
          </span>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
