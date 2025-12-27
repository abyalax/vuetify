<script lang="ts" setup>
  import type { FormDataJobPost } from '../_components/form/job-schema'
  import type { Breadcrumb } from '@/components/ui'
  import Breadcrumbs from '@/components/ui/breadcrumbs.vue'
  import FormJobPost from '../_components/form/form-job-post.vue'
  import { useCreateJob } from '../_hooks/use-create-job-post'
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
      disabled: false,
      href: '/job-post',
    },
    {
      title: 'Create',
      disabled: true,
      href: '/job-post/create',
    },
  ])

  const { mutate } = useCreateJob()

  function onSubmit (values: FormDataJobPost) {
    mutate(values)
  }

</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <FormJobPost button-submit="Create" :on-submit="onSubmit" />
</template>
