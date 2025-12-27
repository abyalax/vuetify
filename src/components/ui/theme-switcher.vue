<script setup lang="ts">
  import { mdiCheck, mdiLaptop, mdiMoonWaningCrescent, mdiThemeLightDark, mdiWhiteBalanceSunny } from '@mdi/js'
  import { onMounted, ref } from 'vue'
  import { useTheme } from 'vuetify'
  import { VBtn, VIcon, VList, VListItem, VMenu } from 'vuetify/components'

  const theme = useTheme()
  const currentTheme = ref<'light' | 'dark' | 'system'>('system')

  // Load theme preference from localStorage
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme-preference') as 'light' | 'dark' | 'system' | null
    if (savedTheme) {
      currentTheme.value = savedTheme
      applyTheme(savedTheme)
    } else {
      applySystemTheme()
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (currentTheme.value === 'system') {
        const matchThemes = e.matches ? 'dark' : 'light'
        theme.change(matchThemes)
      }
    })
  })

  function applyTheme (selectedTheme: 'light' | 'dark' | 'system') {
    if (selectedTheme === 'system') {
      applySystemTheme()
    } else {
      theme.change(selectedTheme)
    }
  }

  function applySystemTheme () {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const matchThemes = isDark ? 'dark' : 'light'
    theme.change(matchThemes)
  }

  function setTheme (selectedTheme: 'light' | 'dark' | 'system') {
    currentTheme.value = selectedTheme
    localStorage.setItem('theme-preference', selectedTheme)
    applyTheme(selectedTheme)
  }

  const themeOptions = [
    { value: 'light', label: 'Light', icon: mdiWhiteBalanceSunny },
    { value: 'dark', label: 'Dark', icon: mdiMoonWaningCrescent },
    { value: 'system', label: 'System', icon: mdiLaptop },
  ] as const

  function getCurrentIcon () {
    const option = themeOptions.find(opt => opt.value === currentTheme.value)
    return option?.icon || mdiThemeLightDark
  }
</script>

<template>
  <VMenu :close-on-content-click="false" location="bottom end">
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        class="theme-switcher"
        :icon="getCurrentIcon()"
        size="default"
        variant="text"
      >
        <VIcon :icon="getCurrentIcon()" />
      </VBtn>
    </template>

    <VList class="theme-menu" density="comfortable">
      <VListItem
        v-for="option in themeOptions"
        :key="option.value"
        :active="currentTheme === option.value"
        :prepend-icon="option.icon"
        :title="option.label"
        @click="setTheme(option.value)"
      >
        <template #append>
          <VIcon
            v-if="currentTheme === option.value"
            color="primary"
            :icon="mdiCheck"
          />
        </template>
      </VListItem>
    </VList>
  </VMenu>
</template>

<style scoped>
.theme-switcher {
  transition: transform 0.2s ease;
}

.theme-switcher:hover {
  transform: rotate(20deg);
}

.theme-menu {
  min-width: 160px;
}
</style>
