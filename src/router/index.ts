import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import('@/views/PreviewItemsView.vue'),
    },
    {
      path: '/preview/:archiveId',
      name: 'preview-result',
      component: () => import('@/views/PreviewResultView.vue'),
    },
  ]
})

export default router
