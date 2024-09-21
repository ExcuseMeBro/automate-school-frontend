import { RouteRecordRaw } from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/login',
    name: 'PLogin',
    meta: {
      layout: 'auth',
      protected: false,
    },
    component: () => import('@/modules/login/views/PIndex.vue'),
  },
]

export default routes
