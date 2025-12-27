/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Antd from 'ant-design-vue'
import VueApexCharts from 'vue3-apexcharts'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import VueTablerIcons from 'vue-tabler-icons'
import { getQueryClient } from '@/libs/query/client'
import router from '../router'
import pinia from '../stores'
import vuetify from './vuetify'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueApexCharts)
    .use(VueQueryPlugin, { queryClient: getQueryClient() })
    .use(PerfectScrollbarPlugin)
    .use(VueTablerIcons)
    .use(Antd)
}
