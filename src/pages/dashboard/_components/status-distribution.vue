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
  const donutSeries = [20, 20, 150, 10]

  const donutLabels = computed<string[]>(() => {
    return [
      'Need Action',
      'Submitted',
      'Published',
      'Others',
    ]
  })

  const donutColorMap: Record<string, string> = {
    'Need Action': '#db585a',
    'Submitted': '#82c1d6',
    'Published': '#93d6a8',
    'Others': '#f5d6a9',
  }

  /**
   * Total di tengah donut
   */
  const totalValue = computed(() =>
    donutSeries.reduce((acc, v) => acc + v, 0),
  )

  /**
   * Chart Options
   */
  const donutChartOptions = computed<ApexOptions>(() => {
    return {
      chart: {
        type: 'donut',

        zoom: {
          enabled: true,
        },
        injectStyleSheet: true,
        fontFamily: 'inherit',
        foreColor: 'rgba(var(--v-theme-secondary), var(--v-high-opacity))',
      },
      labels: donutLabels.value,
      colors: donutLabels.value.map(
        label => donutColorMap[label] ?? '#E0E0E0',
      ),
      stroke: {
        width: 6,
        lineCap: 'round',
        colors: ['white'],
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: string) {
          return val + '%'
        },
      },
      legend: {
        position: 'left',
        fontSize: '13px',
        markers: {
          size: 10,
          shape: 'circle', // atau 'circle'
        },
        itemMargin: {
          vertical: 6,
        },
        show: true,
        formatter: (seriesName: string, opts: any) => {
          const value = opts.w.globals.series[opts.seriesIndex]

          return `
            <div style="display:flex; justify-content:space-between; width:120px">
              <span>${seriesName}</span>
              <strong>${value}</strong>
            </div>
          `
        },
      },
      plotOptions: {
        pie: {
          offsetX: 8,
          offsetY: -8,
          expandOnClick: true,
          donut: {
            size: '61%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '14px',
                offsetY: 20,
              },
              value: {
                show: true,
                fontSize: '28px',
                fontWeight: 600,
                offsetY: -10,
                formatter: () => totalValue.value.toString(),
              },
              total: {
                show: true,
                label: 'Total RFQ',
                fontSize: '12px',
                formatter: () => totalValue.value.toString(),
              },
            },
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
        Status Distribution
      </v-card-title>
    </v-card-item>

    <v-card-text>
      <apexchart
        height="260"
        :options="donutChartOptions"
        :series="donutSeries"
        type="donut"
      />
    </v-card-text>
  </v-card>
</template>
