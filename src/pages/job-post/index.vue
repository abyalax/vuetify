<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { ref } from 'vue'
  import { VCol, VRow } from 'vuetify/components'
  import Page from '@/components/layouts/dashboard/page.vue'
  import TableJobPost from './_components/table-job-post.vue'
  definePage({
    meta: {
      layout: 'authenticated',
      requiresAuth: true,
    },
  })
  const page = ref({ title: 'Job Post' })
  const breadcrumbs = ref<Breadcrumb[]>([
    {
      title: 'Job Post',
      disabled: true,
      href: '/job-post',
    },
  ])
</script>
<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <Page>
    <VRow>
      <VCol cols="12">
        <TableJobPost />
      </VCol>
    </VRow>
  </Page>
</template>
