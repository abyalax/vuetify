<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from '@/components/layouts/dashboard/header/header.vue'
  import Sidebar from '@/components/layouts/dashboard/sidebar/sidebar.vue'
  import Notification from '@/components/ui/notification.vue'
  import { useCustomizerStore } from '@/stores/customizer-store'
  import LoaderWrapper from './blank/_components/loader-wrapper.vue'

  const customizer = useCustomizerStore()
</script>

<template>
  <Notification />
  <v-locale-provider>

    <v-app :class="[customizer.mini_sidebar ? 'mini-sidebar' : '']">
      <Sidebar />
      <Header />

      <v-main class="page-wrapper">
        <v-container fluid>
          <div>
            <LoaderWrapper />
            <RouterView />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
