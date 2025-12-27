<template>
  <div class="logo">
    <RouterLink aria-label="logo" to="/dashboard">
      <img alt="Logo" src="/logo.png" style="width: 150px; height: 32px;">
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
  import { RouterLink } from 'vue-router'
</script>
