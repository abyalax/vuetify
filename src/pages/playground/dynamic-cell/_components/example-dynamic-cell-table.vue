<script setup lang="ts">
  import { useHierarchicalCellTable } from '../_hooks/use-hierachical-cell-table'

  // todo : consistency naming children or groups
  const materials = [
    {
      id: 'm-1',
      server: 'BCG',
      vendor_direct: 'Metra Kreative, PT',
      vendor_aggregator: 'Koperasi Karyawan, PT',
      category: 'Material',
      sub_category: 'Raw',
      group: {
        name: 'MatGroup',
        number: '1000',
        server: 'BCG',
        vendor_direct: 'Metra Kreative, PT',
        vendor_aggregator: 'Koperasi Karyawan, PT',
        category: 'Material',
        sub_category: 'Raw',
        children: [
          {
            name: 'Ext v1',
            number: '1000-1',
            server: 'BCG',
            vendor_direct: 'Metra Kreative, PT',
            vendor_aggregator: 'Koperasi Karyawan, PT',
            category: 'Material',
            sub_category: 'Raw',
            children: [
              {
                name: 'Matnum',
                number: '1000-1a',
                server: 'BCG',
                vendor_direct: 'Metra Kreative, PT',
                vendor_aggregator: 'Koperasi Karyawan, PT',
                category: 'Material',
                sub_category: 'Raw',
                children: [
                  {
                    name: 'Subs',
                    number: '1000-1a1',
                    server: 'BCG',
                    vendor_direct: 'Metra Kreative, PT',
                    vendor_aggregator: 'Koperasi Karyawan, PT',
                    category: 'Material',
                    sub_category: 'Raw',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ]

  const { rows } = useHierarchicalCellTable(materials)

  console.log(rows.value)

</script>
<template>

  <v-table class="custom-table" fixed-header>
    <thead>
      <tr>
        <th>Server</th>
        <th colspan="4">Group</th>
        <th>Group Number</th>
        <th>Vendor Direct</th>
        <th>Vendor Aggregator</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in rows" :key="row.node.nodeKey">

        <td v-if="row.meta.depth === 0" :rowspan="row.meta.rowspan">
          {{ row.data?.server }}
        </td>

        <td :colspan="4 - row.meta.depth">
          {{ row.node.record.name }}
        </td>

        <!-- last work, disini row dan colspan belum implement as well -->
        <td>{{ row.node.record.number }}</td>
        <td>{{ row.data?.vendor_direct }}</td>
        <td>{{ row.data?.vendor_aggregator }}</td>
      </tr>

    </tbody>
  </v-table>

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
