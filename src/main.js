import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import { markRaw } from 'vue'

const pinia = createPinia()

// allows us to access the router from the store
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
