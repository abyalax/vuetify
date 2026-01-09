<script lang="ts" setup>
  import type { Menu } from './sidebar-item'
  import { computed } from 'vue'
  import { getUserPermissionKey } from '@/stores/auth'
  import { useAuthStore } from '@/stores/auth/auth-store'
  import NavItem from './nav-item.vue'

  const auth = useAuthStore()
  const componentProps = defineProps<{ item: Menu, level?: number }>()

  const filteredChildren = computed(() => {
    if (!auth.user || !componentProps.item?.children) {
      return componentProps.item?.children || []
    }

    // Extract user permissions (using permission.name for UI)
    const userPermissions = getUserPermissionKey(auth.user)

    return componentProps.item.children.filter((child: Menu) => {
      // Allow items without permissions (public)
      if (!child.permissions) {
        return true
      }

      // OR logic - salah satu permission cukup
      return child.permissions.some((perm: string) => userPermissions.includes(perm))
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
    <template #activator="{ props: activatorProps }">
      <v-list-item
        v-bind="activatorProps"
        class="mb-1"
        color="primary"
        rounded
        :value="componentProps.item?.title"
      >
        <!---Icon  -->
        <template #prepend>
          <component :is="componentProps.item?.icon" class="iconClass" :level="componentProps.level" />
        </template>
        <!---Title  -->
        <v-list-item-title class="mr-auto">{{ componentProps.item?.title }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="componentProps.item?.subCaption" class="text-caption mt-n1 hide-menu">
          {{ componentProps.item?.subCaption }}
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
