<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { ref } from 'vue'
  import { VCol, VRow } from 'vuetify/components'
  import Page from '@/components/layouts/dashboard/page.vue'
  import TableCvServer from './_components/table-cv-server.vue'
  definePage({
    meta: {
      layout: 'authenticated',
      requiresAuth: true,
    },
  })
  const page = ref({ title: 'Curriculum Vitae' })
  const breadcrumbs = ref<Breadcrumb[]>([
    {
      title: 'CV',
      disabled: true,
      href: '/cv',
    },
  ])
</script>
<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <Page>
    <VRow>
      <VCol cols="12">
        <TableCvServer />
      </VCol>
    </VRow>
  </Page>
</template>
