<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { ref } from 'vue'
  import { PERMISSION } from '@/common/permission'
  import Page from '@/components/layouts/dashboard/page.vue'
  import PermissionGuard from '@/components/ui/permission-guard.vue'
  const page = ref({ title: 'Playground' })
  const breadcrumbs = ref<Breadcrumb[]>([
    {
      title: 'Playground',
      disabled: true,
      href: '/playground',
    },
  ])

</script>
<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <Page>
    Ini content playground
    <v-container fluid>
      <PermissionGuard :permissions="[PERMISSION.CANDIDATE.PLAYGROUND]">
        <v-btn>Must Be Show</v-btn>
      </PermissionGuard>
      <PermissionGuard :permissions="[PERMISSION.ADMIN.candidate_read]">
        <v-btn>Must Be Hide</v-btn>
      </PermissionGuard>
    </v-container>
  </Page>
</template>
