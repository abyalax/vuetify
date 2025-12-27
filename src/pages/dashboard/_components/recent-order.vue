<script setup lang="ts">
  import { shallowRef } from 'vue'

  import UiTitleCard from '@/components/ui/ui-title-card.vue'

  const projects = shallowRef([
    {
      number: 13_256_498,
      order: 125,
      name: 'Keyboard',
      amount: '$70,999',
      priority: 'rejected',
    },
    {
      number: 13_286_564,
      order: 100,
      name: 'Computer Accessories',
      amount: '$83,348',
      priority: 'approved',
    },
    {
      number: 84_564_564,
      order: 40,
      name: 'Camera Lens',
      amount: '$40,570',
      priority: 'rejected',
    },
    {
      number: 86_739_658,
      order: 99,
      name: 'TV',
      amount: '$410,780',
      priority: 'pending',
    },
    {
      number: 98_652_366,
      order: 50,
      name: 'Handset',
      amount: '$10,239',
      priority: 'approved',
    },
    {
      number: 98_753_263,
      order: 89,
      name: 'Mouse',
      amount: '$10,570',
      priority: 'rejected',
    },
    {
      number: 98_753_275,
      order: 185,
      name: 'Desktop',
      amount: '$98,063',
      priority: 'approved',
    },
    {
      number: 98_753_291,
      order: 100,
      name: 'Chair',
      amount: '$14,001',
      priority: 'pending',
    },
    {
      number: 98_756_325,
      order: 355,
      name: 'Mobile',
      amount: '$90,989',
      priority: 'approved',
    },
    {
      number: 98_764_564,
      order: 300,
      name: 'Laptop',
      amount: '$180,139',
      priority: 'pending',
    },
  ])
</script>

<template>
  <UiTitleCard class-name="px-0 pb-0 rounded-md" title="Recent Orders">
    <v-table class="bordered-table" density="comfortable" hover>
      <thead class="bg-containerBg">
        <tr>
          <th class="text-left text-caption font-weight-bold text-uppercase">Tracking no.</th>
          <th class="text-left text-caption font-weight-bold text-uppercase">Product name</th>
          <th class="text-right text-caption font-weight-bold text-uppercase" style="min-width: 100px">Total order</th>
          <th class="text-left text-caption font-weight-bold text-uppercase">Status</th>
          <th class="text-right text-caption font-weight-bold text-uppercase">Total amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in projects" :key="item.name">
          <td class="py-3">
            <router-link class="text-secondary link-hover" to="/dashboard">{{ item.number }}</router-link>
          </td>
          <td class="py-3">{{ item.name }}</td>
          <td class="py-3 text-right" style="min-width: 100px">{{ item.order }}</td>
          <td class="py-3">
            <v-chip v-if="item.priority === 'rejected'" class="px-0" size="small" variant="text">
              <v-avatar class="mr-2" color="error" size="8" variant="flat" />
              <p class="text-h6 mb-0">Rejected</p>
            </v-chip>
            <v-chip v-else-if="item.priority === 'approved'" class="px-0" size="small" variant="text">
              <v-avatar class="mr-2" color="success" size="8" variant="flat" />
              <p class="text-h6 mb-0">Approved</p>
            </v-chip>
            <v-chip v-else class="px-0" size="small" variant="text">
              <v-avatar class="mr-2" color="warning" size="8" variant="flat" />
              <p class="text-h6 mb-0">Pending</p>
            </v-chip>
          </td>
          <td class="py-3 text-right" style="min-width: 100px">{{ item.amount }}</td>
        </tr>
      </tbody>
    </v-table>
  </UiTitleCard>
</template>
