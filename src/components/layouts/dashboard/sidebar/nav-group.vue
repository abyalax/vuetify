<script lang="ts" setup>
  const props = defineProps({ item: Object })
</script>

<template>
  <v-list-subheader class="smallCap text-subtitle-2" color="lightText">{{ props.item?.header }}</v-list-subheader>
</template>
