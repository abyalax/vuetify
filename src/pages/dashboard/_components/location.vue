<script setup lang="ts">
  import type { ApexOptions } from 'apexcharts'
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const colors = computed(() => {
    const c = theme.current.value.colors
    return [
      c.primary,
      c.success,
      c.warning,
      c.error,
      c.info,
    ]
  })

  /**
   * Data Donut
   */
  const donutSeries = [75, 25]

  const pieLabels = [
    'Berao HO',
    'Mutiara Tanjung Lestari',
  ]

  /**
   * Chart Options
   */
  const donutChartOptions = computed<ApexOptions>(() => {
    return {
      chart: {
        type: 'pie',
        fontFamily: 'inherit',
        foreColor: 'rgba(var(--v-theme-secondary), var(--v-high-opacity))',
      },
      labels: pieLabels,
      colors: colors.value,
      stroke: {
        width: 0,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'left',
        fontSize: '13px',
        markers: {
          size: 10,
          shape: 'circle',
        },
        itemMargin: {
          vertical: 6,
        },
        formatter: (seriesName: string, opts: any) => {
          const value = opts.w.globals.series[opts.seriesIndex]

          return `
            <div style="display:flex; justify-content:space-between; width: 200px">
              <span>${seriesName}</span>
              <strong>${value}</strong>
            </div>
          `
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            size: '50%',
          },
        },
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val}`,
        },
      },
    }
  })
</script>

<template>
  <v-card class="p-2" rounded="lg" variant="outlined">
    <v-card-item>
      <v-card-title class="text-subtitle-1 font-weight-medium pb-2" style="border-bottom: 1px solid gray;">
        Location
      </v-card-title>
    </v-card-item>

    <v-card-text>
      <apexchart
        height="100"
        :options="donutChartOptions"
        :series="donutSeries"
        type="pie"
      />
    </v-card-text>
  </v-card>
</template>
