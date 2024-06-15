import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PreviewItemsView from '../views/PreviewItemsView.vue'
import PreviewResultView from '../views/PreviewResultView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/preview',
      name: 'preview',
      component: PreviewItemsView,
    },
    {
      path: '/preview/:archiveId',
      name: 'preview-result',
      component: PreviewResultView,
    },
  ]
})

export default router
