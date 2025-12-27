<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { notifications } from '../hooks/use-notifications'

  const show = ref<boolean[]>([])

  watchEffect(() => {
    show.value = notifications.value.map(() => true)
  })
</script>
<template>
  <div class="fixed top-4 right-4 flex flex-col gap-2 z-50">
    <v-snackbar
      v-for="(n, i) in notifications"
      :key="i"
      v-model="show[i]"
      :color="n.color"
      location="top center"
      :timeout="3000"
    >
      {{ n.message }}
    </v-snackbar>
  </div>
</template>
