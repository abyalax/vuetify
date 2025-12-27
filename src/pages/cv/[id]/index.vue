<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { useRoute } from 'vue-router'
  import { useGetCV } from '../_hooks/use-get-cv'

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
      disabled: false,
      href: '/cv',
    },
    {
      title: 'Detail',
      disabled: true,
      href: '/cv/1',
    },
  ])
  const route = useRoute()
  // @ts-expect-error
  const id = route.params.id

  console.log(id)

  const { data } = useGetCV(id)

</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <pre><code>{{ JSON.stringify(data, null, 2) }}</code></pre>
</template>
