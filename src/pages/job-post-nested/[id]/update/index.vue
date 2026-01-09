<script setup lang="ts">
  import type { FormDataJobPost } from '../../_components/form/job-schema'
  import type { Breadcrumb } from '@/components/ui'
  import { useRoute } from 'vue-router'
  import FormJobPost from '../../_components/form/form-job-post.vue'
  import { useGetJob } from '../../_hooks/use-get-job-post'
  import { useUpdateJob } from '../../_hooks/use-update-job-post'

  const { params } = useRoute()
  // @ts-expect-error
  const id = params.id
  const { data } = useGetJob(id)
  const { mutate } = useUpdateJob(id)

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

  function onSubmit (values: FormDataJobPost) {
    mutate(values)
  }

</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <FormJobPost button-submit="Save" :initial-values="data" :on-submit="onSubmit" />
</template>
