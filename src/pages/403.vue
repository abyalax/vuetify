<script setup lang="ts">
  import { mdiArrowLeft, mdiBackspace, mdiHome, mdiLockAlert, mdiRefresh } from '@mdi/js'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  import { useTheme } from 'vuetify'

  const router = useRouter()
  const theme = useTheme()

  const isDark = computed(() => theme.global.name.value === 'dark')

  function handleBack () {
    router.back()
  }

  function handleRefresh () {
    window.location.reload()
  }

  function handleHome () {
    router.push('/dashboard')
  }
</script>

<template>
  <div class="forbidden-page">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col
          cols="12"
          lg="6"
          md="8"
          sm="10"
          xl="4"
        >
          <!-- Error Container -->
          <div class="text-center">
            <!-- 403 Number -->
            <div class="error-number" :class="{ 'dark-text': isDark }">
              403
            </div>

            <!-- Error Title -->
            <h1 class="text-h4 font-weight-bold mb-4">
              Access Forbidden
            </h1>

            <!-- Error Description -->
            <p class="text-body1 mb-8" :class="{ 'text-grey-lighten-1': isDark, 'text-grey-darken-1': !isDark }">
              You don't have permission to access this resource. If you believe this is an error, please contact support.
            </p>

            <!-- Illustration/Icon -->
            <div class="mb-8">
              <v-icon color="error" :icon="mdiLockAlert" opacity="0.3" size="120" />
            </div>

            <!-- Action Buttons -->
            <div class="d-flex ga-3 mb-6 justify-center flex-wrap">
              <v-btn
                color="primary"
                :prepend-icon="mdiArrowLeft"
                size="large"
                variant="elevated"
                @click="handleBack"
              >
                Go Back
              </v-btn>

              <v-btn
                color="secondary"
                :prepend-icon="mdiRefresh"
                size="large"
                variant="elevated"
                @click="handleRefresh"
              >
                Refresh Page
              </v-btn>

              <v-btn
                color="success"
                :prepend-icon="mdiHome"
                size="large"
                variant="elevated"
                @click="handleHome"
              >
                Back to Dashboard
              </v-btn>
            </div>

            <!-- Additional Info -->
            <div class="text-caption" :class="{ 'text-grey': isDark, 'text-grey-darken-2': !isDark }">
              Error Code: 403 • Access Denied
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.forbidden-page {
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .error-number {
    font-size: 120px;
    font-weight: 900;
    line-height: 1;
    color: rgb(var(--v-theme-on-background));
    margin-bottom: 24px;
    letter-spacing: -2px;
    opacity: 0.8;
  }
}
</style>
