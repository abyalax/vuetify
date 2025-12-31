<script setup lang="ts">
  import type { SortOrder, TFilterParams } from '@/common/meta'
  import type { CV } from '@/types'
  import { mdiBriefcaseOutline, mdiChevronDown, mdiClose, mdiDelete, mdiDeleteOutline, mdiDownload, mdiEyeOutline, mdiFileDocumentOutline, mdiMagnify, mdiPackage, mdiPencilOutline, mdiPlus, mdiSchoolOutline } from '@mdi/js'
  import { useDebounceFn } from '@vueuse/core'
  import { computed, reactive, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { VBtn, VCard, VCardTitle, VChip, VList, VListItem, VMenu, VTextField, VTooltip } from 'vuetify/components'
  import { useDeleteCV } from '../_hooks/use-delete-cv'
  import { useGetListCV } from '../_hooks/use-get-list-cv'

  const router = useRouter()
  const route = useRoute()
  const selected = ref<CV[]>([])
  const expanded = ref<string[]>([])
  const state = reactive<TFilterParams>({
    page: Number(route.query.page) || 1,
    per_page: Number(route.query.per_page) || 10,
    search: route.query.search as string,
    sort: route.query.sort as string,
    order: route.query.order as SortOrder,
  })
  const searchInput = ref(state.search)
  const debouncedSearch = useDebounceFn((value?: string) => {
    state.search = value
    state.page = 1 // Reset to first page on search
  }, 500)

  const headers = [
    { title: 'Name', key: 'name', align: 'start' },
    { title: 'Skills', key: 'skills', sortable: false },
    { title: 'Experience', key: 'experiences', sortable: true, align: 'start' },
    { title: 'Educations', key: 'educations', sortable: true, align: 'start' },
    { title: 'Expected Salary', key: 'expectedSalary', align: 'end' },
    { title: 'Actions', key: 'actions', sortable: false, align: 'center', width: '140px' },
  ] as const

  const queryParams = computed(() => ({
    page: state.page,
    per_page: state.per_page,
    search: state.search,
    sort: state.sort,
    order: state.order,
  }))

  const { data, isLoading } = useGetListCV(queryParams)
  const { mutate } = useDeleteCV()
  const items = computed(() => data.value?.items ?? [])
  const meta = computed(() => data.value?.meta)

  function handleCreateCV () {
    router.push('/cv/create')
  }

  function handleView (params: CV) {
    router.push(`/cv/${params.id}`)
  }

  function handleEdit (params: CV) {
    router.push(`/cv/${params.id}/update`)
  }

  function handleDelete (params: CV) {
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

  function updateOptions (options: {
    page: number
    itemsPerPage: number
    sortBy: { key: string, order: 'asc' | 'desc' }[]
  }) {
    state.page = options.page
    state.per_page = options.itemsPerPage

    const sort = options.sortBy[0]
    state.sort = sort?.key
    state.order = sort?.order.toLowerCase() as SortOrder
  }

  watch(
    state,
    () => {
      router.replace({
        query: {
          page: state.page?.toString(),
          per_page: state.per_page?.toString(),
          search: state.search || undefined,
          sort: state.sort,
          order: state.order,
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
  <VCard elevation="2">
    <VCardTitle class="d-flex align-center justify-space-between pa-4">
      <span class="text-h5 font-weight-medium">CV Management</span>
      <VBtn color="primary" :prepend-icon="mdiPlus" @click="handleCreateCV">
        Create CV
      </VBtn>
    </VCardTitle>

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
            <VBtn v-bind="props" :append-icon="mdiChevronDown" color="primary" variant="tonal">
              Actions
            </VBtn>
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
        placeholder="Search by name, skills..."
        :prepend-inner-icon="mdiMagnify"
        variant="outlined"
        @click:clear="searchInput = ''"
      />
    </div>

    <v-data-table-server
      v-model="selected"
      v-model:expanded="expanded"
      v-model:items-per-page="state.per_page"
      v-model:page="state.page"
      class="custom-table"
      fixed-header
      :headers="headers"
      hover
      item-key="id"
      :items="items"
      :items-length="meta?.total ?? 0"
      :loading="isLoading"
      :search="state.search"
      show-expand
      show-select
      style="max-height: 65dvh;"
      @update:options="updateOptions"
    >
      <template #[`item.name`]="{ value }">
        <span class="font-weight-medium">{{ value }}</span>
      </template>

      <template #[`item.skills`]="{ value }">
        <div class="d-flex flex-wrap ga-1 ">
          <VChip
            v-for="skill in value?.slice(0, 3)"
            :key="skill"
            color="primary"
            size="small"
            variant="tonal"
          >
            {{ skill }}
          </VChip>
        </div>
      </template>

      <template #[`item.experiences`]="{ value }">
        <div v-if="value?.length > 0" class="d-flex align-center ga-2">
          <v-icon color="primary" :icon="mdiBriefcaseOutline" size="16" />
          <span class="text-truncate text-caption" style="max-width: 150px;">
            {{ value[0].position }} at {{ value[0].companyName }}
          </span>
          <v-chip v-if="value.length > 1" size="x-small" variant="tonal">+{{ value.length - 1 }}</v-chip>
        </div>
        <span v-else class="text-caption text-grey">No experience</span>
      </template>

      <template #[`item.educations`]="{ value }">
        <div v-if="value?.length > 0" class="d-flex align-center ga-2">
          <v-icon color="success" :icon="mdiSchoolOutline" size="16" />
          <span class="text-truncate text-caption" style="max-width: 150px;">
            {{ value[0].degree }}
          </span>
        </div>
        <span v-else class="text-caption text-grey">No education</span>
      </template>

      <template #[`item.expectedSalary`]="{ value }">
        <span v-if="value" class="font-weight-medium">
          Rp {{ value.toLocaleString('id-ID') }}
        </span>
        <span v-else class="text-medium-emphasis">—</span>
      </template>

      <template #[`item.actions`]="{ item }">
        <div class="d-flex justify-center ga-1">
          <v-tooltip location="top" text="View Details">
            <template #activator="{ props }">
              <VBtn
                v-bind="props"
                color="info"
                :icon="mdiEyeOutline"
                size="small"
                variant="text"
                @click="handleView(item)"
              />
            </template>
          </v-tooltip>

          <v-tooltip location="top" text="Edit CV">
            <template #activator="{ props }">
              <VBtn
                v-bind="props"
                color="primary"
                :icon="mdiPencilOutline"
                size="small"
                variant="text"
                @click="handleEdit(item)"
              />
            </template>
          </v-tooltip>

          <v-tooltip location="top" text="Delete CV">
            <template #activator="{ props }">
              <VBtn
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

      <template #expanded-row="{ columns, item }">
        <tr>
          <td class="pa-0" :colspan="columns.length">
            <v-divider />

            <v-container class="pa-4" fluid>

              <v-row>
                <v-col cols="12" md="6">
                  <div class="text-overline text-primary font-weight-bold mb-3 d-flex align-center">
                    <v-icon :icon="mdiBriefcaseOutline" size="18" start />
                    Work History ({{ item.experiences?.length || 0 }})
                  </div>
                  <div v-if="item.experiences?.length > 0">
                    <div v-for="(exp, index) in item.experiences" :key="index" class="mb-4 ps-2 border-s-lg border-primary">
                      <div class="text-body-2 font-weight-bold">{{ exp.position }}</div>
                      <div class="text-caption font-weight-medium">{{ exp.companyName }}</div>
                      <div class="text-caption text-grey">{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</div>
                      <div v-if="exp.description" class="text-caption mt-1 italic">{{ exp.description }}</div>
                    </div>
                  </div>
                  <div v-else class="text-caption text-grey italic">No experience data provided.</div>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="text-overline text-success font-weight-bold mb-3 d-flex align-center">
                    <v-icon :icon="mdiSchoolOutline" size="18" start />
                    Education ({{ item.educations?.length || 0 }})
                  </div>
                  <div v-if="item.educations?.length > 0">
                    <div v-for="(edu, index) in item.educations" :key="index" class="mb-4 ps-2 border-s-lg border-success">
                      <div class="text-body-2 font-weight-bold">{{ edu.degree }}</div>
                      <div class="text-caption font-weight-medium">{{ edu.institution }}</div>
                      <div class="text-caption text-grey">{{ edu.startYear }} - {{ edu.endYear || 'Present' }}</div>
                    </div>
                  </div>
                  <div v-else class="text-caption text-grey italic">No education data provided.</div>
                </v-col>
              </v-row>
            </v-container>
          </td>
        </tr>
      </template>

      <template #no-data>
        <div class="d-flex flex-column align-center justify-center pa-8">
          <v-icon class="mb-4" color="grey-lighten-1" :icon="mdiFileDocumentOutline" size="64" />
          <div class="text-h6 text-medium-emphasis mb-2">No CVs Found</div>
          <div class="text-body-2 text-medium-emphasis mb-4">
            {{ state.search ? 'Try adjusting your search' : 'Get started by creating your first CV' }}
          </div>
          <VBtn v-if="!state.search" color="primary" :prepend-icon="mdiPlus" @click="handleCreateCV">
            Create Your First CV
          </VBtn>
          <VBtn v-else variant="outlined" @click="searchInput = ''">Clear Search</VBtn>
        </div>
      </template>

      <template #loading>
        <div class="d-flex justify-center align-center pa-8">
          <v-progress-circular color="primary" indeterminate />
        </div>
      </template>
    </v-data-table-server>
  </VCard>
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
