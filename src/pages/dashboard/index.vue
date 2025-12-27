<script setup lang="ts">
  import type { Breadcrumb } from '@/components/ui'
  import AnalyticsReport from './_components/analytics-report.vue'
  import HelpSupport from './_components/help-support.vue'
  import IncomeOverview from './_components/income-overview.vue'
  import RecentOrder from './_components/recent-order.vue'
  import SalesReport from './_components/sales-report.vue'
  import TransactionHistory from './_components/transaction-history.vue'
  import UniqueVisitor from './_components/unique-visitor.vue'
  import WidgetFive from './_components/widget-five.vue'
  definePage({
    meta: {
      layout: 'authenticated',
      requiresAuth: true,
    },
  })
  const breadcrumbs = ref<Breadcrumb[]>([
    {
      title: 'Dashboard',
      disabled: true,
      href: '/dashboard',
    },
  ])
</script>
<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" title="Dashboard" />
  <!-- -------------------------------------------------------------------- -->
  <!-- Total widgets -->
  <!-- -------------------------------------------------------------------- -->
  <WidgetFive />

  <v-row class="mb-0">
    <!-- -------------------------------------------------------------------- -->
    <!-- Unique visitor -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="8">
      <UniqueVisitor />
    </v-col>

    <!-- -------------------------------------------------------------------- -->
    <!-- Income overview -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <IncomeOverview />
    </v-col>
  </v-row>
  <v-row class="mb-0">
    <!-- -------------------------------------------------------------------- -->
    <!-- Recent order -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="8">
      <RecentOrder />
    </v-col>

    <!-- -------------------------------------------------------------------- -->
    <!-- Analytics Report -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <AnalyticsReport />
    </v-col>
  </v-row>
  <v-row>
    <!-- -------------------------------------------------------------------- -->
    <!-- Sales Report -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="7">
      <SalesReport />
    </v-col>

    <v-col cols="12" md="5">
      <v-row>
        <!-- -------------------------------------------------------------------- -->
        <!-- Transaction History -->
        <!-- -------------------------------------------------------------------- -->
        <v-col cols="12">
          <TransactionHistory />
        </v-col>

        <!-- -------------------------------------------------------------------- -->
        <!-- Help support -->
        <!-- -------------------------------------------------------------------- -->
        <v-col cols="12">
          <HelpSupport />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
