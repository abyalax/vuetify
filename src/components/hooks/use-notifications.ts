import { ref } from 'vue'

export const notifications = ref<{ message: string, color?: string }[]>([])

export function useNotification () {
  function success (message: string, color = 'success') {
    notifications.value.push({ message, color })
  }

  function error (message: string, color = 'error') {
    notifications.value.push({ message, color })
  }

  function warning (message: string, color = 'warning') {
    notifications.value.push({ message, color })
  }

  function remove (index: number) {
    notifications.value.splice(index, 1)
  }

  const notify = { success, error, warning }

  return { notifications, notify, remove }
}
