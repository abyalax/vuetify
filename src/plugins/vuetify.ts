/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const dark: ThemeDefinition = {
  dark: true,
  variables: {
    'border-color': '#4a5563ff',
    'card-shadow': '0px 2px 6px rgba(0,0,0,0.6)',
    'medium-opacity': 0.85,
    'high-opacity': 1,
  },
  colors: {
    'primary': '#58a6ff', // linkColor
    'secondary': '#8b949e',
    'success': '#3fb950', // onlineIndicator
    'info': '#58a6ff',
    'warning': '#d29922', // awayIndicator
    'error': '#f85149', // errorTextColor

    'background': '#0d1117', // centerChannelBg
    'surface': '#15181d', // sidebarBg / card bg
    'on-background': '#c9d1d9', // centerChannelColor

    'outline': '#30363d',

    'link': '#58a6ff',
    'mention': '#f85149',

    'sidebarBg': '#15181d',
    'sidebarHover': '#1e2229',
    'sidebarActiveBorder': '#3b82f6',

    'codeBg': '#0d1117',
    'codeText': '#c9d1d9',
  },
}

const light: ThemeDefinition = {
  dark: false,
  variables: {
    'border-color': '#575555ff',
    'carousel-control-size': 10,
    'gradient':
      'linear-gradient(250.38deg, #e6f4ff 2.39%, #69b1ff 34.42%, #1677ff 60.95%, #0958d9 84.83%, #002c8c 104.37%)',
    'gradient2': 'linear-gradient(to right, rgb(9, 89, 218), rgb(22, 119, 255))',
    'card-shadow': '0px 1px 4px rgba(0, 0, 0, 0.08)',
    'medium-opacity': 0.85,
    'high-opacity': 1,
  },
  colors: {
    'primary': '#1677ff',
    'secondary': '#8c8c8c',
    'info': '#13c2c2',
    'success': '#52c41a',
    'accent': '#FFAB91',
    'warning': '#faad14',
    'error': '#ff4d4f',
    'lightprimary': '#e6f4ff',
    'lightsecondary': '#f5f5f5',
    'lightsuccess': '#EAFCD4',
    'lighterror': '#FFE7D3',
    'lightwarning': '#FFF6D0',
    'darkText': '#212121',
    'lightText': '#8c8c8c',
    'darkprimary': '#0958d9',
    'darksecondary': '#7a7878',
    'borderLight': '#e6ebf1',
    'inputBorder': '#a1a1a5',
    'containerBg': '#fafafb',
    'surface': '#fff',
    'on-surface-variant': '#fff',
    'facebook': '#4267b2',
    'twitter': '#1da1f2',
    'linkedin': '#0e76a8',
    'gray100': '#f5f5f5',
    'primary200': '#a1d2ff',
    'secondary200': '#eeeeee',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light, dark,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
    },
    sets: {
      mdi,
    },
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md',
    },
    VTextField: {
      rounded: 'lg',
    },
    VTooltip: {
      location: 'top',
      style: {
        '--v-tooltip-background-color': 'rgb(var(--v-theme-surface-variant))',
        '--v-tooltip-text-color': 'rgb(var(--v-theme-on-surface-variant))',
      },
    },
  },
})
