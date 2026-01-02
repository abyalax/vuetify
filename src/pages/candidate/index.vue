<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { ref } from 'vue'
  import { PERMISSION } from '@/common/permission'
  import { ROLES } from '@/common/role'
  import Page from '@/components/layouts/dashboard/page.vue'
  definePage({
    meta: {
      layout: 'authenticated',
      requiresAuth: true,
      roles: [ROLES.CANDIDATE],
      permissions: [PERMISSION.CANDIDATE.cv_read],
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
    This is plan for page cv that user guest have
  </Page>
</template>
