<script lang="ts" setup>
  import type { FormDataCandidate } from '../_components/form/candidate-schema'
  import type { Breadcrumb } from '@/components/ui'
  import Breadcrumbs from '@/components/ui/breadcrumbs.vue'
  import FormCV from '../_components/form/form-candidate.vue'
  import { useCreateCandidate } from '../_hooks/use-create-candidate'
  definePage({
    meta: {
      layout: 'authenticated',
      requiresAuth: true,
    },
  })
  const page = ref({ title: 'Candidate' })
  const breadcrumbs = ref<Breadcrumb[]>([
    {
      title: 'Candidate',
      disabled: false,
      href: '/candidate',
    },
    {
      title: 'Create',
      disabled: true,
      href: '/candidate/create',
    },
  ])

  const { mutate } = useCreateCandidate()

  function onSubmit (values: FormDataCandidate) {
    mutate(values)
  }

</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <FormCV button-submit="Create" :on-submit="onSubmit" />
</template>
