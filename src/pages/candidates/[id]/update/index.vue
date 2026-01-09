<script setup lang="ts">
  import type { FormDataCandidate } from '../../_components/form/candidate-schema'
  import type { Breadcrumb } from '@/components/ui'
  import { useRoute } from 'vue-router'
  import FormCandidate from '../../_components/form/form-candidate.vue'
  import { useGetCandidate } from '../../_hooks/use-get-candidate'
  import { useUpdateCandidate } from '../../_hooks/use-update-candidate'

  const { params } = useRoute()
  // @ts-expect-error
  const id = params.id
  const { data } = useGetCandidate(id)
  const { mutate } = useUpdateCandidate(id)

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

  function onSubmit (values: FormDataCandidate) {
    mutate(values)
  }

</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <FormCandidate button-submit="Save" :initial-values="data" :on-submit="onSubmit" />
</template>
