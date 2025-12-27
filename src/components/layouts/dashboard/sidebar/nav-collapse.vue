<script lang="ts" setup>
  import NavItem from './nav-item.vue'
  const componentProps = defineProps({ item: Object, level: Number })
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!---Item Childern -->
  <!-- ---------------------------------------------- -->
  <v-list-group no-action>
    <!-- ---------------------------------------------- -->
    <!---Dropdown  -->
    <!-- ---------------------------------------------- -->
    <template #activator="{ props }">
      <v-list-item
        v-bind="props"
        class="mb-1"
        color="primary"
        rounded
        :value="item?.title"
      >
        <!---Icon  -->
        <template #prepend>
          <component :is="item?.icon" class="iconClass" :level="level" />
        </template>
        <!---Title  -->
        <v-list-item-title class="mr-auto">{{ item?.title }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="item?.subCaption" class="text-caption mt-n1 hide-menu">
          {{ item?.subCaption }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>
    <!-- ---------------------------------------------- -->
    <!---Sub Item-->
    <!-- ---------------------------------------------- -->
    <template v-for="(subitem, i) in item?.children" :key="i">
      <NavCollapse v-if="subitem?.children" :item="subitem" :level="(componentProps.level ?? 0) + 1" />
      <NavItem v-else :item="subitem" :level="(componentProps.level ?? 0) + 1" />
    </template>
  </v-list-group>

  <!-- ---------------------------------------------- -->
  <!---End Item Sub Header -->
  <!-- ---------------------------------------------- -->
</template>
