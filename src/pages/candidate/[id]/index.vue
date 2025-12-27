<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { useRoute } from 'vue-router'
  import { useGetCandidate } from '../_hooks/use-get-candidate'

  definePage({
    meta: {
      layout: 'authenticated',
      requiresAuth: true,
    },
  })
  const route = useRoute()
  // @ts-expect-error
  const id = route.params.id
  const { data } = useGetCandidate(id)
  const page = ref({ title: 'Candidate' })
  const breadcrumbs = ref<Breadcrumb[]>([
    {
      title: 'Candidate',
      disabled: false,
      href: '/candidate',
    },
    {
      title: 'Detail',
      disabled: true,
      href: `/candidate/${id}`,
    },
  ])

</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <pre><code>{{ JSON.stringify(data, null, 2) }}</code></pre>
</template>
