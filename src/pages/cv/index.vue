<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { ref } from 'vue'
  import { VCol, VRow } from 'vuetify/components'
  import { PERMISSION } from '@/common/permission'
  import { ROLES } from '@/common/role'
  import Page from '@/components/layouts/dashboard/page.vue'
  import TableCV from './_components/table-cv.vue'
  definePage({
    meta: {
      layout: 'authenticated',
      requiresAuth: true,
      roles: [ROLES.ADMIN],
      permissions: [
        PERMISSION.cv_read,
      ],
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
        <TableCV />
      </VCol>
    </VRow>
  </Page>
</template>
