import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Gallery from '@/pages/Gallery.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Dashboard // For now, editor and dashboard are the same
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
