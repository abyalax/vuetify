<script setup lang="ts">
  import { mdiChevronDown, mdiChevronRight } from '@mdi/js'
  import { materials } from '../_hooks/data'
  import { useHierarchicalCellTable } from '../_hooks/use-hierachical-cell-table'
  import { useTableData } from '../_hooks/use-table-data'

  const { state, updated, submitted } = useTableData(materials)

  const { rows, toggle } = useHierarchicalCellTable(state)

  console.log(rows.value)

  // at this, we need to use wrapper state model to make data reactive and system watch action from user
  // use hooks useTableData

</script>
<template>

  <v-table class="custom-table" fixed-header>
    <thead>
      <tr>
        <th rowspan="2">Server</th>
        <th colspan="5">Group</th>
        <th colspan="2">Vendor</th>
      </tr>
      <tr>
        <th colspan="4">Group Name</th>
        <th>Group Number</th>
        <th>Direct</th>
        <th>Aggregator</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in rows" :key="row.node.nodeKey">

        <td v-if="row.meta.depth === 0" :rowspan="row.meta.rowspan">
          <v-text-field
            v-model="row.data.server"
            dense
            hide-details
            style="min-width: 50px;"
            variant="plain"
          />
        </td>

        <template v-if="row.meta.depth === 0">
          <td :colspan="4">
            <v-text-field
              v-model="row.node.record.name"
              dense
              hide-details
              style="min-width: 130px;"
              variant="plain"
            />
          </td>
        </template>

        <template v-else>
          <!-- Empty cells for depth -->
          <td v-for="i in Math.max(0, row.meta.depth - 1)" :key="`empty-${i}`" colspan="1" />
          <!-- Icon cell -->
          <td colspan="1">
            <v-icon v-if="!row.meta.isLeaf" :icon="row.meta.isExpanded ? mdiChevronDown : mdiChevronRight" @click="toggle(row.node.nodeKey)" />
          </td>
          <!-- Name cell -->
          <td colspan="1">
            <v-text-field
              v-model="row.node.record.name"
              dense
              hide-details
              style="min-width: 50px;"
              variant="plain"
            />
          </td>
          <!-- Empty cells to fill 4 columns -->
          <td v-for="i in Math.max(0, 3 - row.meta.depth)" :key="`empty-end-${i}`" colspan="1" />
        </template>

        <td>
          <v-text-field
            v-model="row.node.record.number"
            dense
            hide-details
            style="min-width: 50px;"
            variant="plain"
          />
        </td>
        <td>
          <v-text-field
            v-model="row.data.vendor_direct"
            dense
            hide-details
            style="min-width: 130px;"
            variant="plain"
          />
        </td>
        <td>
          <v-text-field
            v-model="row.data.vendor_aggregator"
            dense
            hide-details
            style="min-width: 150px;"
            variant="plain"
          />
        </td>
      </tr>

    </tbody>
  </v-table>

  <v-btn v-if="updated" class="mt-4" color="primary" @click="submitted = true">Submit Changes</v-btn>

</template>
<style scoped>
/* Same styles as before */
.custom-table {
  border: 1px solid rgba(var(--v-border-color), 0.12);
  border-radius: 4px;
}

.custom-table :deep(thead) {
  background-color: rgb(var(--v-theme-surface));
  text-align: center;
}

.custom-table :deep(thead th) {
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  text-align: center !important;
  border-bottom: 1px solid rgba(var(--v-border-color), 0.12) !important;
  border-right: 1px solid rgba(var(--v-border-color), 0.08) !important;
}

.custom-table :deep(thead th:last-child) {
  border-right: none !important;
}

.custom-table :deep(tbody tr) {
  background-color: rgb(var(--v-theme-surface));
  border-bottom: 1px solid rgba(var(--v-border-color), 0.08) !important;
  transition: background-color 0.15s ease;
}

.custom-table :deep(tbody tr:hover) {
  background-color: rgba(var(--v-theme-primary), 0.06);
}

.custom-table :deep(tbody tr:last-child) {
  border-bottom: none !important;
}

.custom-table :deep(tbody td) {
  border-right: 1px solid rgba(var(--v-border-color), 0.08) !important;
}

.custom-table :deep(tbody td:last-child) {
  border-right: none !important;
}

.custom-table :deep(.v-data-table__td--select),
.custom-table :deep(.v-data-table__th--select) {
  border-right: 1px solid rgba(var(--v-border-color), 0.08) !important;
}

.custom-table :deep(.v-data-table__td) {
  border-top: 1px solid rgba(var(--v-border-color), 0.12) !important;
}

.v-data-table :deep(.v-data-table__expanded__content) {
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05) !important;
}

ul {
  list-style-type: disc;
}
</style>
