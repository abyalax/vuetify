<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { ref } from 'vue'
  import { VCol, VRow } from 'vuetify/components'
  import { PERMISSION } from '@/common/permission'
  import { ROLES } from '@/common/role'
  import Page from '@/components/layouts/dashboard/page.vue'
  import TableCandidate from './_components/table-candidate.vue'
  definePage({
    meta: {
      layout: 'authenticated',
      requiresAuth: true,
      roles: [ROLES.ADMIN],
      permissions: [
        PERMISSION.ADMIN.candidate_read,
      ],
    },
  })
  const page = ref({ title: 'Candidate' })
  const breadcrumbs = ref<Breadcrumb[]>([
    {
      title: 'Candidate',
      disabled: true,
      href: '/candidate',
    },
  ])
</script>
<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <Page>
    <VRow>
      <VCol cols="12">
        <TableCandidate />
      </VCol>
    </VRow>
  </Page>
</template>
