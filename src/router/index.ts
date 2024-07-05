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
      component: () => import('@/views/archives/PreviewArchivesView.vue'),
    },
    {
      path: '/preview/:archiveId',
      name: 'preview-archive',
      redirect: { name: 'preview-result'},
      component: () => import('@/views/archives/PreviewArchiveView.vue'),
      children: [
        {
          path: '',
          name: 'preview-result',
          component: () => import('@/views/archives/PreviewArchiveResultView.vue'),
        },
        {
          path: 'trash',
          name: 'preview-result-trash',
          component: () => import('@/views/archives/RemovedUnfollowersView.vue'),
        },
      ],
    },
    {
      path: '/whitelist',
      name: 'whitelist',
      component: () => import('@/views/WhitelistView.vue'),
    },
  ]
})

export default router
