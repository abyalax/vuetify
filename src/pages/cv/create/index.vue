<script lang="ts" setup>
  import type { FormDataCV } from '../_components/form/cv-schema'
  import type { Breadcrumb } from '@/components/ui'
  import Breadcrumbs from '@/components/ui/breadcrumbs.vue'
  import FormCV from '../_components/form/form-cv.vue'
  import { useCreateCV } from '../_hooks/use-create-cv'
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
      title: 'Create',
      disabled: true,
      href: '/cv/create',
    },
  ])

  const { mutate } = useCreateCV()

  function onSubmit (values: FormDataCV) {
    mutate(values)
  }

</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <FormCV button-submit="Create" :on-submit="onSubmit" />
</template>
