<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import FooterPanel from '@/components/layouts/dashboard/footer.vue'
  import Header from '@/components/layouts/dashboard/header/header.vue'
  import LoaderWrapper from './blank/_components/loader-wrapper.vue'

</script>

<template>
  <v-locale-provider>
    <Header />

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
