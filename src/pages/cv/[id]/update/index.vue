<script setup lang="ts">
  import type { FormDataCV } from '../../_components/form/cv-schema'
  import type { Breadcrumb } from '@/components/ui'
  import { useRoute } from 'vue-router'
  import FormCV from '../../_components/form/form-cv.vue'
  import { useGetCV } from '../../_hooks/use-get-cv'
  import { useUpdateCV } from '../../_hooks/use-update-cv'

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
      disabled: false,
      href: '/cv/1',
    },
  ])
  const { params } = useRoute()
  // @ts-expect-error
  const id = params.id
  const { data } = useGetCV(id)
  const { mutate } = useUpdateCV(id)

  function onSubmit (values: FormDataCV) {
    mutate(values)
  }

</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <FormCV button-submit="Save" :initial-values="data" :on-submit="onSubmit" />
</template>
