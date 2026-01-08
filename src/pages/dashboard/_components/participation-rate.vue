<script setup lang="ts">
  import { mdiCircle } from '@mdi/js'
  import { computed } from 'vue'

  type ParticipationItem = {
    label: string
    value: number
    color: string
  }

  type ParticipationComputedItem = ParticipationItem & {
    percent: number
    width: number
  }

  const BASE_WIDTH = 20 // px
  const SCALE = 1.2 // px per percent

  const items: ParticipationItem[] = [
    {
      label: 'Not Submitted',
      value: 35,
      color: 'error',
    },
    {
      label: 'Declined',
      value: 30,
      color: 'warning',
    },
    {
      label: 'Accepted',
      value: 170,
      color: 'success',
    },
  ]

  /**
   * Total value
   */
  const total = computed(() =>
    items.reduce((acc, item) => acc + item.value, 0),
  )

  /**
   * Items with percent & dynamic width
   */
  const computedItems = computed<ParticipationComputedItem[]>(() =>
    items.map(item => {
      const percent = total.value
        ? Math.round((item.value / total.value) * 100)
        : 0

      return {
        ...item,
        percent,
        width: BASE_WIDTH + percent * SCALE,
      }
    }),
  )

</script>

<template>
  <v-card class="p-2" rounded="lg" variant="text">
    <v-card-item>
      <v-card-title class="text-subtitle-1 font-weight-medium pb-2" style="border-bottom: 1px solid gray;">
        Participation Rate
      </v-card-title>
    </v-card-item>

    <v-card-text>
      <v-row no-gutters>
        <!-- LEFT -->
        <v-col cols="5">
          <div
            v-for="item in computedItems"
            :key="item.label"
            class="d-flex align-center mb-2"
          >
            <v-icon
              class="mr-2"
              :color="item.color"
              :icon="mdiCircle"
              size="10"
            />
            <span class="text-body-2 flex-grow-1">
              {{ item.label }}
            </span>
            <span class="text-body-2 font-weight-medium">
              {{ item.value }}
            </span>
          </div>
        </v-col>

        <!-- RIGHT -->
        <v-col class="d-flex flex-row justify-center ga-2" cols="7">
          <div
            v-for="item in computedItems"
            :key="item.label"
            class="mb-2"
          >
            <v-chip
              :color="item.color"
              size="small"
              :style="{ width: `${item.width}px` }"
              variant="elevated"
            >
              {{ item.percent }}%
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
