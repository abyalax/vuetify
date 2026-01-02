<script lang="ts" setup>
  import { computed } from 'vue'
  import { hasPermission } from '@/stores/auth'
  import { useAuthStore } from '@/stores/auth/auth-store'
  import NavItem from './nav-item.vue'

  const auth = useAuthStore()
  const componentProps = defineProps({ item: Object, level: Number })

  const filteredChildren = computed(() => {
    if (!auth.user || !componentProps.item?.children) {
      return componentProps.item?.children || []
    }

    return componentProps.item.children.filter((child: any) => {
      // Allow items without permissions
      if (!child.permissions) {
        return true
      }

      // Check if user has any of the required permissions
      return hasPermission(auth.user, child.permissions)
    })
  })
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
    <template v-for="(subitem, i) in filteredChildren" :key="i">
      <NavCollapse v-if="subitem?.children" :item="subitem" :level="(componentProps.level ?? 0) + 1" />
      <NavItem v-else :item="subitem" :level="(componentProps.level ?? 0) + 1" />
    </template>
  </v-list-group>

  <!-- ---------------------------------------------- -->
  <!---End Item Sub Header -->
  <!-- ---------------------------------------------- -->
</template>
