<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { useRoute } from 'vue-router'
  import { useGetCV } from '../_hooks/use-get-cv'

  const route = useRoute()
  // @ts-expect-error
  const id = route.params.id
  const { data } = useGetCV(id)

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
      href: `/cv/${id}`,
    },
  ])

</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <pre><code>{{ JSON.stringify(data, null, 2) }}</code></pre>
</template>
