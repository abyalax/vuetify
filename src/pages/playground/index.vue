<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { ref } from 'vue'
  import Page from '@/components/layouts/dashboard/page.vue'
  import { useAuthStore } from '@/stores/auth/auth-store'
  definePage({
    meta: {
      layout: 'authenticated',
      requiresAuth: true,
    },
  })
  const page = ref({ title: 'Playground' })
  const breadcrumbs = ref<Breadcrumb[]>([
    {
      title: 'Playground',
      disabled: true,
      href: '/playground',
    },
  ])

  const { $state } = useAuthStore()

</script>
<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <Page>
    <v-row>
      This is Board Playground
    </v-row>
  </Page>
</template>
