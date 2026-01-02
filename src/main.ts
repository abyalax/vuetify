/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { setupMockBrowser } from './libs/worker'
import '@fontsource/public-sans/400.css'
import '@fontsource/public-sans/500.css'
import '@fontsource/public-sans/600.css'
import '@fontsource/public-sans/700.css'
import 'ant-design-vue/dist/reset.css'
import '@/scss/style.scss'
import 'unfonts.css'

async function bootstrap () {
  if (import.meta.env.DEV) {
    await setupMockBrowser()
  }

  const app = createApp(App)
  registerPlugins(app)

  app.mount('#app')
}

bootstrap()
