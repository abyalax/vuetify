<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import VerticalHeader from '@/components/layouts/dashboard/header/vertical-header.vue'
  import VerticalSidebar from '@/components/layouts/dashboard/sidebar/vertical-sidebar.vue'
  import Notification from '@/components/ui/notification.vue'
  import { useCustomizerStore } from '@/stores/customizer-store'
  import LoaderWrapper from './blank/_components/LoaderWrapper.vue'

  const customizer = useCustomizerStore()
</script>

<template>
  <Notification />
  <v-locale-provider>

    <v-app :class="[customizer.mini_sidebar ? 'mini-sidebar' : '']">
      <VerticalSidebar />
      <VerticalHeader />

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
