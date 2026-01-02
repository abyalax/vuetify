<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { hasPermission } from '@/stores/auth'
  import { useAuthStore } from '@/stores/auth/auth-store'
  import { useCustomizerStore } from '@/stores/customizer-store'

  import LogoDark from '../logo.vue'

  import NavCollapse from './nav-collapse.vue'
  import NavGroup from './nav-group.vue'
  import NavItem from './nav-item.vue'
  import sidebarItems from './sidebar-item'

  const customizer = useCustomizerStore()
  const auth = useAuthStore()

  const filteredMenu = computed(() => {
    if (!auth.user) {
      return sidebarItems
    }

    return sidebarItems.filter(item => {
      // Allow headers, dividers, and items without permissions
      if (item.header || item.divider || !item.permissions) {
        return true
      }

      // Check if user has any of the required permissions
      return hasPermission(auth.user, item.permissions)
    })
  })
</script>

<template>
  <v-navigation-drawer
    v-model="customizer.Sidebar_drawer"
    app
    class="leftSidebar"
    elevation="0"
    expand-on-hover
    left
    mobile-breakpoint="lg"
    :rail="customizer.mini_sidebar"
    rail-width="60"
  >
    <div class="pa-5">
      <LogoDark />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list aria-busy="true" aria-label="menu list">
        <!---Menu Loop -->
        <template v-for="(item, i) in filteredMenu" :key="i">
          <!---Item Sub Header -->
          <NavGroup v-if="item.header" :key="item.title" :item="item" />
          <!---Item Divider -->
          <v-divider v-else-if="item.divider" class="my-3" />
          <!---If Has Child -->
          <NavCollapse v-else-if="item.children" class="leftPadding" :item="item" :level="0" />
          <!---Single Item-->
          <NavItem v-else :item="item" />
          <!---End Single Item-->
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
