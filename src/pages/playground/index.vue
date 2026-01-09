<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import { ref } from 'vue'
  import Page from '@/components/layouts/dashboard/page.vue'
  definePage({
    meta: {
      layout: 'authenticated',
      requiresAuth: true,
    },
  })
  const page = ref({ title: 'Playground' })
  const breadcrumbs = ref<Breadcrumb[]>([
    {
      title: 'Playground',
      disabled: true,
      href: '/playground',
    },
  ])

</script>
<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" :title="page.title" />
  <Page>
    <h1>PO-0001: Penambahan Informasi Brand, Garansi, UOM, dan Storage Location</h1>
    <v-container fluid>
      <v-form>
        <v-row dense>
          <!-- Column 1 -->
          <v-col
            cols="12"
            lg="4"
            sm="6"
          >
            <v-text-field
              label="First Name"
              variant="outlined"
            />
          </v-col>

          <!-- Column 2 -->
          <v-col
            cols="12"
            lg="4"
            sm="6"
          >
            <v-text-field
              label="Last Name"
              variant="outlined"
            />
          </v-col>

          <!-- Column 3 -->
          <v-col
            cols="12"
            lg="4"
            sm="6"
          >
            <v-text-field
              label="Email"
              variant="outlined"
            />
          </v-col>

          <!-- Row berikutnya tetap konsisten -->
          <v-col
            cols="12"
            lg="4"
            sm="6"
          >
            <v-text-field
              label="Phone"
              variant="outlined"
            />
          </v-col>

          <v-col
            cols="12"
            lg="4"
            sm="6"
          >
            <v-select
              :items="['Admin', 'User']"
              label="Role"
              variant="outlined"
            />
          </v-col>

          <v-col
            cols="12"
            lg="4"
            sm="6"
          >
            <v-text-field
              label="Company"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </Page>
</template>
