<script setup lang="ts">
  import { GithubOutlined, MenuFoldOutlined, SearchOutlined } from '@ant-design/icons-vue'
  import ThemeSwitcher from '@/components/ui/theme-switcher.vue'
  import { useAuthStore } from '@/stores/auth-store'
  import { useCustomizerStore } from '@/stores/customizer-store'
  import NotificationDD from './notification-dd.vue'
  import ProfileDD from './profile-dd.vue'
  import SearchBarPanel from './search-bar-panel.vue'

  const customizer = useCustomizerStore()
  const { $state } = useAuthStore()
</script>

<template>
  <v-app-bar elevation="0" height="60">
    <v-btn
      class="hidden-md-and-down text-secondary mr-3"
      color="darkText"
      icon
      rounded="sm"
      size="small"
      variant="text"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    >
      <MenuFoldOutlined :style="{ fontSize: '16px' }" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up text-secondary ms-3"
      color="darkText"
      icon
      rounded="sm"
      size="small"
      variant="text"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
    >
      <MenuFoldOutlined :style="{ fontSize: '16px' }" />
    </v-btn>

    <!-- search mobile -->
    <v-menu class="hidden-lg-and-up" :close-on-content-click="false" offset="10, 0">
      <template #activator="{ props }">
        <v-btn
          class="hidden-lg-and-up text-secondary ml-1"
          color="lightsecondary"
          icon
          rounded="sm"
          size="small"
          variant="flat"
          v-bind="props"
        >
          <SearchOutlined :style="{ fontSize: '17px' }" />
        </v-btn>
      </template>
      <v-sheet class="search-sheet v-col-12 pa-0" width="320">
        <v-text-field
          color="primary"
          hide-details
          persistent-placeholder
          placeholder="Search here.."
          variant="solo"
        >
          <template #prepend-inner>
            <SearchOutlined :style="{ fontSize: '17px' }" />
          </template>
        </v-text-field>
      </v-sheet>
    </v-menu>

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->
    <v-sheet class="d-none d-lg-block" width="250">
      <SearchBarPanel />
    </v-sheet>

    <!---/Search part -->

    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->

    <!-- ---------------------------------------------- -->
    <!-- Github -->
    <!-- ---------------------------------------------- -->
    <v-btn
      class="text-secondary hidden-sm-and-down d-flex"
      color="darkText"
      href="https://github.com/abyalax/vuetify"
      icon
      rounded="sm"
      target="_blank"
      variant="text"
    >
      <GithubOutlined :style="{ fontSize: '16px' }" />
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <!-- ---------------------------------------------- -->
    <NotificationDD />

    <ThemeSwitcher />

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" offset="8, 0">
      <template #activator="{ props }">
        <v-btn class="profileBtn" rounded="sm" variant="text" v-bind="props">
          <div class="d-flex align-center">
            <v-avatar class="mr-sm-2 mr-0 py-2">
              <img alt="Julia" src="@/assets/images/users/avatar-1.png">
            </v-avatar>
            <h6 class="text-subtitle-1 mb-0 d-sm-block d-none">{{ $state.user?.name }}</h6>
          </div>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="290">
        <ProfileDD />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>
