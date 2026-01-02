<script setup lang="ts">
  import type { TFilterParams } from '@/common/meta'
  import type { JobPost } from '@/types'
  import { mdiChevronDown, mdiClose, mdiDelete, mdiDeleteOutline, mdiDownload, mdiEyeOutline, mdiMagnify, mdiPackage, mdiPencilOutline, mdiPlus } from '@mdi/js'
  import { useDebounceFn } from '@vueuse/core'
  import { computed, reactive, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useDeleteJob } from '../_hooks/use-delete-job-post'
  import { useGetListJob } from '../_hooks/use-get-list-jobs-post'

  const router = useRouter()
  const route = useRoute()
  const selected = ref<JobPost[]>([])
  const state = reactive<TFilterParams>({
    page: Number(route.query.page) || 1,
    per_page: Number(route.query.per_page) || 10,
    search: (route.query.search as string) ?? '',
  })
  const searchInput = ref(state.search)
  const debouncedSearch = useDebounceFn((value?: string) => {
    state.search = value
    state.page = 1 // Reset to first page on search
  }, 500)

  const headers = [
    { title: 'Title', key: 'title', align: 'start', sortable: true },
    { title: 'Department', key: 'department', align: 'start', sortable: true },
    { title: 'Description', key: 'description', sortable: false },
    { title: 'Type Of Employee', key: 'employmentType', sortable: false },
    { title: 'Status', key: 'status', sortable: false },
    { title: 'Address', key: 'location', align: 'start', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false, align: 'center', width: '140px' },
  ] as const

  const queryParams = computed(() => ({
    page: state.page,
    per_page: state.per_page,
    search: state.search,
    sort: state.sort,
    order: state.order,
  }))

  const { data, isLoading } = useGetListJob(queryParams)
  const { mutate } = useDeleteJob()
  const meta = computed(() => data.value?.meta)
  const items = computed(() => data.value?.items ?? [])

  function formatCurrency (value: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)
  }

  function handleCreate () {
    router.push('/job-post/create')
  }

  function handleView (params: JobPost) {
    router.push(`/job-post/${params.id}`)
  }

  function handleEdit (params: JobPost) {
    router.push(`/job-post/${params.id}/update`)
  }

  function handleDelete (params: JobPost) {
    mutate(params.id)
  }

  function handleBulkDelete () {
    console.log('Bulk delete:', selected.value.map(item => item.id))
    selected.value = []
  }

  function handleBulkExport () {
    console.log('Bulk export:', selected.value.map(item => item.id))
  }

  function clearSelection () {
    selected.value = []
  }

  function updateOptions (options: TFilterParams) {
    Object.assign(state, options)
  }

  watch(
    state,
    value => {
      router.replace({
        query: {
          page: value.page,
          per_page: value.per_page,
          search: value.search,
          sort: value.sort,
          order: value.order,
        },
      })
    },
    { deep: true, immediate: true },
  )

  watch(searchInput, newValue => {
    debouncedSearch(newValue)
  })

</script>
<template>
  <v-card elevation="2">
    <v-card-title class="d-flex align-center justify-space-between pa-4">
      <span class="text-h5 font-weight-medium">Job Post Management</span>
      <v-btn color="primary" :prepend-icon="mdiPlus" @click="handleCreate">
        Create New Job Post
      </v-btn>
    </v-card-title>

    <div class="d-flex ga-3 px-4 pb-4">
      <v-dialog max-width="340">
        <template #activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" :prepend-icon="mdiPackage">
            Filter
          </v-btn>
        </template>

        <template #default="{ isActive }">
          <v-card
            :prepend-icon="mdiPackage"
            text="When using the activator slot, you must bind the slot props to the activator element."
            title="Filter Curriculum Vitae"
          >
            <template #actions>
              <v-btn class="ml-auto" text="Close" @click="isActive.value = false" />
            </template>
          </v-card>
        </template>
      </v-dialog>

      <div v-if="selected.length > 0" style="margin-right: 10px;">
        <VMenu>
          <template #activator="{ props }">
            <v-btn v-bind="props" :append-icon="mdiChevronDown" color="primary" variant="tonal">
              Actions
            </v-btn>
          </template>
          <VList density="compact">
            <VListItem :prepend-icon="mdiDownload" title="Export Selected" @click="handleBulkExport" />
            <VListItem class="text-error" :prepend-icon="mdiDelete" title="Delete Selected" @click="handleBulkDelete" />
            <VListItem :prepend-icon="mdiClose" title="Clear Selected" @click="clearSelection" />
          </VList>
        </VMenu>
      </div>

      <v-text-field
        v-model="searchInput"
        clearable
        density="compact"
        hide-details
        placeholder="Search by name..."
        :prepend-inner-icon="mdiMagnify"
        variant="outlined"
        @click:clear="searchInput = ''"
      />
    </div>

    <TreeDataTable
      :headers="headers"
      :items="items"
      :loading="isLoading"
      :pagination="state"
      :total-items="meta?.total ?? 0"
      @update:pagination="updateOptions"
    >
      <template #[`item.title`]="{ item }">
        <div :style="{ paddingLeft: `${item.__level * 24}px` }">
          {{ item.title }}
        </div>
      </template>

      <template #[`item.employmentType`]="{ value }">
        <v-chip class="text-capitalize" size="small" variant="tonal">
          {{ value.replace('-', ' ') }}
        </v-chip>
      </template>

      <template #[`item.status`]="{ value }">
        <v-chip
          class="text-uppercase font-weight-bold"
          :color="value === 'published' ? 'success' : 'warning'"
          label
          size="small"
        >
          {{ value }}
        </v-chip>
      </template>

      <template #[`item.minSalary`]="{ item }">
        <div class="text-no-wrap text-body-2">
          {{ formatCurrency(item.minSalary) }} - {{ formatCurrency(item.maxSalary) }}
        </div>
      </template>

      <template #[`item.actions`]="{ item }">
        <div class="d-flex justify-center ga-1">
          <v-tooltip location="top" text="View Details">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="info"
                :icon="mdiEyeOutline"
                size="small"
                variant="text"
                @click="handleView(item)"
              />
            </template>
          </v-tooltip>

          <v-tooltip location="top" text="Edit Candidate">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="primary"
                :icon="mdiPencilOutline"
                size="small"
                variant="text"
                @click="handleEdit(item)"
              />
            </template>
          </v-tooltip>

          <v-tooltip location="top" text="Delete Candidate">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="error"
                :icon="mdiDeleteOutline"
                size="small"
                variant="text"
                @click="handleDelete(item)"
              />
            </template>
          </v-tooltip>
        </div>
      </template>

    </TreeDataTable>
  </v-card>
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

.experience-cell,
.education-cell {
  max-width: 250px;
  margin: 10px 0;
}

.experience-item,
.education-item {
  padding: 8px;
  background: rgba(var(--v-theme-surface-variant), 0.3);
  border-radius: 6px;
  border-left: 3px solid rgb(var(--v-theme-primary));
}

.education-item {
  border-left-color: rgb(var(--v-theme-success));
}
</style>
