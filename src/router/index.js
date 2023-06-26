import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/views/ViewMain/ViewMain.vue'
import Managers from '@/components/TheManagers.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/managers',
    name: 'Managers',
    component: Managers
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
