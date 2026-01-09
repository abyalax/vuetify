<script setup lang="ts">
  import { computed } from 'vue'
  import { getUserPermissionKey, hasPermission } from '@/stores/auth'
  import { useAuthStore } from '@/stores/auth/auth-store'

  interface Props {
    /**
     * Required permissions (AND logic - semua permission harus ada)
     */
    permissions: string[]
    /**
     * Logic type: 'AND' (default) or 'OR'
     * - AND: semua permission harus ada
     * - OR: salah satu permission cukup
     */
    logic?: 'AND' | 'OR'
  }

  const props = withDefaults(defineProps<Props>(), {
    logic: 'AND',
  })

  const auth = useAuthStore()
  console.log(auth.user)

  const allowed = computed(() => {
    if (!auth.user || !props.permissions || props.permissions.length === 0) {
      return false
    }

    if (props.logic === 'OR') {
      // OR logic - salah satu permission cukup
      const userPermissions = getUserPermissionKey(auth.user)
      return props.permissions.some(p => userPermissions.includes(p))
    } else {
      // AND logic - semua permission harus ada (default)
      return hasPermission(auth.user, props.permissions)
    }
  })
</script>

<template>
  <slot v-if="allowed" />
  <template v-else-if="$slots.fallback">
    <slot name="fallback" />
  </template>
</template>
