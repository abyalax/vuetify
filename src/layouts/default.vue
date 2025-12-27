<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import FooterPanel from '@/components/layouts/dashboard/footer.vue'
  import VerticalHeader from '@/components/layouts/dashboard/header/vertical-header.vue'
  import LoaderWrapper from './blank/_components/LoaderWrapper.vue'

</script>

<template>
  <v-locale-provider>
    <VerticalHeader />

    <v-main class="page-wrapper">
      <v-container fluid>
        <div>
          <!-- Loader start -->
          <LoaderWrapper />
          <!-- Loader end -->
          <RouterView />
        </div>
      </v-container>
      <v-container class="pt-0" fluid>
        <div>
          <FooterPanel />
        </div>
      </v-container>
    </v-main>
  </v-locale-provider>
</template>
