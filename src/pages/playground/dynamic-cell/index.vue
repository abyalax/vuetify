<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { ref } from 'vue'
  import Page from '@/components/layouts/dashboard/page.vue'
  import ExampleDynamicCellTable from './_components/example-dynamic-cell-table.vue'
  const breadcrumbs = ref<Breadcrumb[]>([
    {
      title: 'Playground',
      disabled: false,
      href: '/playground',
    },
    {
      title: 'Dynamic Cell',
      disabled: true,
      href: '/playground/dynamic-cell',
    },
  ])

</script>
<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" title="Playground" />
  <Page>
    <v-container fluid>
      <ExampleDynamicCellTable />
    </v-container>
  </Page>
</template>
