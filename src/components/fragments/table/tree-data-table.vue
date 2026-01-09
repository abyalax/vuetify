<script setup lang="ts" generic="T extends { id: string; children?: T[] }">
  import type { TableHeader } from '.'
  import type { TFilterParams } from '@/common/meta'
  import { mdiChevronDown, mdiChevronRight, mdiFileDocumentOutline } from '@mdi/js'
  import { computed } from 'vue'
  import { useTreeTable } from '@/components/hooks/use-tree-table'

  const props = defineProps<{
    headers: readonly TableHeader[]
    items: MaybeRef<T[]>
    loading?: boolean
    totalItems: number
    pagination: TFilterParams
  }>()

  const emit = defineEmits<{
    (e: 'update:pagination', value: Partial<TFilterParams>): void
  }>()

  const source = computed(() => unref(props.items))

  const {
    items: treeItems,
    expanded,
    toggleExpand,
    isExpandableRow,
  } = useTreeTable(source)

  const headers = [
    { title: '', key: 'tree', width: '48px', sortable: false },
    ...props.headers,
  ]

</script>

<template>
  <v-data-table-server
    class="custom-table"
    fixed-header
    :headers="headers"
    hover
    item-key="rowKey"
    :items="treeItems"
    :items-length="totalItems"
    :items-per-page="props.pagination.per_page"
    :loading="loading"
    :page="props.pagination.page"
    show-select
    @update:options="(options) => {
      const sort = options.sortBy?.[0]

      emit('update:pagination', {
        page: options.page,
        per_page: options.itemsPerPage,
        sort: sort?.key,
        order: sort?.order,
      })
    }"
  >
    <template #[`item.tree`]="{ item }">
      <v-btn
        v-if="isExpandableRow(item)"
        icon
        size="small"
        variant="text"
        @click.stop="toggleExpand(item.rowKey)"
      >
        <v-icon
          :icon="expanded.includes(item.rowKey)
            ? mdiChevronDown
            : mdiChevronRight"
        />
      </v-btn>
    </template>

    <!-- SLOT FORWARDING -->
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <slot :name="name" v-bind="slotProps" />
    </template>

    <template #no-data>
      <div class="d-flex flex-column align-center justify-center pa-8">
        <v-icon class="mb-4" color="grey-lighten-1" :icon="mdiFileDocumentOutline" size="64" />
        <div class="text-h6 text-medium-emphasis mb-2">No Data Found</div>
        <div class="text-body-2 text-medium-emphasis mb-4">
          Try adjusting your search
        </div>
      </div>
    </template>

    <template #loading>
      <div class="d-flex justify-center align-center pa-8">
        <v-progress-circular color="primary" indeterminate />
      </div>
    </template>

  </v-data-table-server>
</template>

<style scoped>
/* Same styles as before */
.custom-table {
  border: 1px solid rgba(var(--v-border-color), 0.12);
  border-radius: 4px;
}

.custom-table :deep(thead) {
  background-color: rgb(var(--v-theme-surface));
}

.custom-table :deep(thead th) {
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
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
