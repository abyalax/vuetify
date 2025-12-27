<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { useRoute } from 'vue-router'
  import { useGetJob } from '../_hooks/use-get-job-post'

  definePage({
    meta: {
      layout: 'authenticated',
      requiresAuth: true,
    },
  })
  const route = useRoute()
  // @ts-expect-error
  const id = route.params.id
  const { data } = useGetJob(id)
  const page = ref({ title: 'Job Post' })
  const breadcrumbs = ref<Breadcrumb[]>([
    {
      title: 'Job Post',
      disabled: false,
      href: '/job-post',
    },
    {
      title: 'Detail',
      disabled: true,
      href: `/job-post/${id}`,
    },
  ])

</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <pre><code>{{ JSON.stringify(data, null, 2) }}</code></pre>
</template>
