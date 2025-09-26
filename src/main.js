import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

// Import stores to initialize them
import { useProjectsStore } from './stores/projects'
import { useAssetsStore } from './stores/assets'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize stores
const projectsStore = useProjectsStore()
const assetsStore = useAssetsStore()

projectsStore.loadFromLocalStorage()
assetsStore.loadFromLocalStorage()

app.mount('#app')
