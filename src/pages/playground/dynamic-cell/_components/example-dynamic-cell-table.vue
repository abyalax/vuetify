<script setup lang="ts">
  import { mdiChevronDown, mdiChevronRight } from '@mdi/js'
  import { useHierarchicalCellTable } from '../_hooks/use-hierachical-cell-table'

  const materials = [
    {
      id: 'm-1',
      server: 'BCG',
      vendor_direct: 'Metra Kreative, PT',
      vendor_aggregator: 'Koperasi Karyawan, PT',
      category: 'Material',
      sub_category: 'Raw',
      children: [
        {
          name: 'MatGroup',
          number: '1000',
          data: {
            id: 'm-1',
            server: 'BCG',
            vendor_direct: 'Mat Kreative, PT',
            vendor_aggregator: 'Koperasi MatGroup, PT',
            category: 'Material',
            sub_category: 'Raw',
          },
          children: [
            {
              name: 'Ext v1',
              number: '1000-1',
              data: {
                id: 'm-1',
                server: 'BCG',
                vendor_direct: 'Ekt v1 Kreative, PT',
                vendor_aggregator: 'Koperasi Ekt v1, PT',
                category: 'Material',
                sub_category: 'Raw',
              },
              children: [
                {
                  name: 'Matnum',
                  number: '1000-1a',
                  data: {
                    id: 'm-1',
                    server: 'BCG',
                    vendor_direct: 'Matnum Kreative, PT',
                    vendor_aggregator: 'Koperasi Matnum, PT',
                    category: 'Material',
                    sub_category: 'Raw',
                  },
                  children: [
                    {
                      name: 'Subs',
                      number: '1000-1a1',
                      data: {
                        id: 'm-1',
                        server: 'BCG',
                        vendor_direct: 'Subs Kreative, PT',
                        vendor_aggregator: 'Koperasi Subs, PT',
                        category: 'Material',
                        sub_category: 'Raw',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'm-2',
      server: 'SSH',
      vendor_direct: 'Metra Efisien, PT',
      vendor_aggregator: 'Koperasi Managerial, PT',
      category: 'Jasa',
      sub_category: 'Consultant',
      children: [
        {
          name: 'FanGroup',
          number: '1001',
          data: {
            id: 'm-1b',
            server: 'SSH',
            vendor_direct: 'Fan Efficien, PT',
            vendor_aggregator: 'Koperasi FanGroup, PT',
            category: 'Jasa',
            sub_category: 'Consultant',
          },
          children: [
            {
              name: 'Ext a1',
              number: '1000-1',
              data: {
                id: 'm-1b',
                server: 'SSH',
                vendor_direct: 'Ekt a1 Kreative, PT',
                vendor_aggregator: 'Koperasi Ekt a1, PT',
                category: 'Jasa',
                sub_category: 'Consultant',
              },
              children: [
                {
                  name: 'Matnum',
                  number: '1000-1a',
                  data: {
                    id: 'm-1b',
                    server: 'SSH',
                    vendor_direct: 'Matnum Efficien, PT',
                    vendor_aggregator: 'Koperasi Matnum, PT',
                    category: 'Jasa',
                    sub_category: 'Consultant',
                  },
                  children: [
                    {
                      name: 'Subs',
                      number: '1000-1a1',
                      data: {
                        id: 'm-1b',
                        server: 'SSH',
                        vendor_direct: 'Subs Efficien, PT',
                        vendor_aggregator: 'Koperasi Subs, PT',
                        category: 'Jasa',
                        sub_category: 'Consultant',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  const { rows, toggle } = useHierarchicalCellTable(materials)

  console.log(rows.value)

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
          {{ row.data?.server }}
        </td>

        <template v-if="row.meta.depth === 0">
          <td :colspan="4">
            {{ row.node.record.name }}
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
            {{ row.node.record.name }}
          </td>
          <!-- Empty cells to fill 4 columns -->
          <td v-for="i in Math.max(0, 3 - row.meta.depth)" :key="`empty-end-${i}`" colspan="1" />
        </template>

        <td>{{ row.node.record.number }}</td>
        <td>{{ row.data?.vendor_direct }}</td>
        <td>{{ row.data?.vendor_aggregator }}</td>
      </tr>

    </tbody>
  </v-table>

  <pre>
    <code>{{ rows }}</code>
  </pre>

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
