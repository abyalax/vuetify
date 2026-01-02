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

</script>

<template>
  <v-data-table-server
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
