<script setup lang="ts">
  import { mdiChevronDown, mdiChevronRight } from '@mdi/js'
</script>

<template>
  <v-table class="custom-table" fixed-header>
    <thead>
      <!-- 2 row 7 col -->
      <!-- row diambil dari cell header yang memiliki rowspan tertinggi -->
      <!-- col diambil dari sum semua colspan di cell header -->
      <tr>
        <th rowspan="2">#</th>
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
      <tr>
        <!-- Need State to recalculate again rowspan at here cell -->
        <!-- on every action open/close all cell on the entire table -->
        <td rowspan="6">
          <!-- Need State open/close collapsible for icon -->
          <v-icon :icon="mdiChevronDown" />
        </td>

        <!-- Need State to recalculate again rowspan at here cell -->
        <!-- on every action open/close all cell on the entire table -->
        <td rowspan="6">BCG</td>

        <!-- Merge 4 column untuk parent pertama -->
        <!-- merge berapa column ini didapat dari hitungan berapa jumlah child nya -->
        <!-- tapi untuk sementara hardcode dulu, belum dinamis -->
        <!-- but still scallable if need more nested -->
        <td colspan="4">MatGroup</td>
        <td>1000</td>
        <td>Metra Kreative, PT</td>
        <td>Koperasi Karyawan, PT</td>
      </tr>

      <tr>
        <!-- Instead of skip, render cell kosong -->
        <td colspan="1"><v-icon :icon="mdiChevronDown" /></td>
        <td colspan="1">Ext v1</td>
        <!-- like this, don't use cell with colspan > 1 -->
        <td colspan="1" />
        <td colspan="1" />
        <!-- row based, so child have their row data -->
        <td>1000-1</td>
        <td>Metra Kreative, PT</td>
        <td>Koperasi Karyawan, PT</td>
      </tr>

      <tr>
        <!-- look, disini ada pola di bagian nested nya -->
        <!-- nested child => geser data ke cell sebelahnya dan row bawahnya -->
        <td colspan="1" />
        <td colspan="1"><v-icon :icon="mdiChevronDown" /></td>
        <td colspan="1">Matnum</td>
        <td colspan="1" />

        <!-- row based, so child have their row data -->
        <td colspan="1">1000-1a</td>
        <td colspan="1">Metra Kreative, PT</td>
        <td colspan="1">Koperasi Karyawan, PT</td>
      </tr>

      <tr>
        <td colspan="1" />
        <td colspan="1" />
        <!-- Ini adalah child terakhir yang terbuka, so ga perlu ada icon chevron down -->
        <td colspan="1" />
        <td colspan="1">Subs</td>

        <!-- row based, so child have their row data -->
        <td colspan="1">1000-1a1</td>
        <td colspan="1">Metra Kreative, PT</td>
        <td colspan="1">Koperasi Karyawan, PT</td>
      </tr>

      <tr>
        <td colspan="1" />
        <td colspan="1" />
        <!-- Ini adalah child terakhir yang terbuka, so ga perlu ada icon chevron down -->
        <td colspan="1" />
        <td colspan="1">Subs</td>

        <!-- row based, so child have their row data -->
        <td colspan="1">1000-1a1</td>
        <td colspan="1">Metra Kreative, PT</td>
        <td colspan="1">Koperasi Karyawan, PT</td>
      </tr>

      <tr>
        <!-- Example case row is collapse -->
        <td colspan="1"><v-icon :icon="mdiChevronRight" /></td>
        <td colspan="1">Ext v2</td>
        <!-- like this, don't use cell with colspan > 1 -->
        <td colspan="1" />
        <td colspan="1" />

        <!-- row based, so child have their row data -->
        <td colspan="1">1000-1</td>
        <td colspan="1">Metra Kreative, PT</td>
        <td colspan="1">Koperasi Karyawan, PT</td>
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
